# Infraestructura, dominios y publicación — Intellix

Plan de la separación **landing / app** en `intellix.com.ar`, el correo de la marca y la
puesta en producción de esta web.

> Relevado el **2026-08-08**. Nada de lo que sigue está aplicado todavía: al momento de
> escribirlo, el único cambio hecho fue el `email` en `src/lib/site.ts`.
> Antes de ejecutar cualquier bloque, **re-verificar el estado real** (los comandos de
> verificación están al final).

---

## 1. Punto de partida (relevado)

### Dominios de la cuenta DonWeb

| Dominio | Estado | Notas |
|---|---|---|
| `intellix.com.ar` | Registrado, activo (ID 6017763) | Vence 27/05/2027. **NS en DonWeb** (`ns1/ns2.donweb.com`) |
| `intellix.store` | Registrado, activo | Sin uso |
| `pixs.com.ar`, `pixs.site` | Registrados | Pixs se discontinúa; queda solo como firma en el footer |
| `handicapp.com.ar`, `handicapp.site`, `handicapp.online` | Registrados | Otro proyecto |

### Dónde vive cada cosa hoy

| Host | IP | Qué corre |
|---|---|---|
| `intellix.com.ar` + `www` | `200.58.109.110` | **App productiva** (VPS DonWeb) — la usan Josué y la mutual |
| `dev.intellix.com.ar` | `200.58.109.110` | Staging de la app (tenant `nexo`) |
| `send.intellix.com.ar` | — | Resend, envío transaccional. **No tocar** |
| `handicapp.site` | `200.58.111.113` | Hosting compartido Ferozo #4729877 |
| `pixs.com.ar`, `handicapp.com.ar` | `216.198.79.1` | Vercel |

### Operación del VPS (relevado del repo `..\mutualyf`)

| Qué | Dónde |
|---|---|
| Código en el VPS | `/opt/mutualyf`, rama `main` |
| Deploy | `cd /opt/mutualyf && bash scripts/deploy.sh` |
| Compose | `docker-compose.yml` + `docker-compose.prod.yml` |
| Certificados | `/etc/letsencrypt` **del host**, montado `:ro` en nginx |
| Webroot ACME | `/var/www/certbot` del host |
| SSH | puerto `2251` (según comentarios del compose) |
| Paneles | Portainer y pgAdmin en loopback, solo por túnel SSH |

`deploy.sh` ya valida la config de nginx con `nginx -t` **antes** de recrear el contenedor,
y deja impreso el comando de rollback. El cambio de nginx del Bloque 0 entra por ese
camino: commit + push + `deploy.sh`, no editar a mano en el VPS.

#### 🚦 Regla obligatoria antes de cualquier deploy

`deploy.sh` hace `git pull` de **todo** `main`. Arrastra cualquier commit pendiente, no
solo el que uno quiere subir. Hay features deliberadamente apagadas en producción
(conectores, feedback) y trabajo que puede no estar listo para salir.

**Siempre, antes de correr `deploy.sh`:**

```bash
cd /opt/mutualyf && git fetch origin main -q
git log --oneline HEAD..origin/main      # ¿qué se va a arrastrar?
git diff --name-only HEAD origin/main    # ¿qué archivos toca?
```

Si aparece algo que no debe ir a producción, **no se deploya**. Se aísla el cambio en su
propio commit sobre el estado actual del VPS y se sube solo eso.

Verificado el 2026-08-08: VPS y `origin/main` en `9f1e92d`, sin nada pendiente. Y
`CONNECTORS_ENABLED=false` confirmado en el contenedor que corre.

Nota: `deploy.sh` solo rebuildea el frontend si cambian archivos bajo `frontend/`. Un
cambio que toque únicamente `nginx/nginx.prod.conf` **no rebuildea nada** — solo recrea
nginx, sin riesgo de que se cuelen flags de features en un build nuevo.

⚠️ **Dos cosas a tener en cuenta:**

- `scripts/deploy.sh:24` tiene `SITE_HOST="intellix.com.ar"` y el health check final
  verifica que ese host dé 200 desde el propio VPS. **En el Bloque 3 hay que cambiarlo a
  `app.intellix.com.ar`**, o cada deploy va a reportar un estado que ya no corresponde.
- `scripts/deploy.sh:73` avisa que la **base de datos es COMPARTIDA prod ↔ staging**.
  `dev.intellix.com.ar` no es un sandbox aislado: sirve para probar nginx y certificados
  (que no tocan datos), pero no para probar nada que escriba en la base.

### Verificado en el VPS el 2026-08-08

| Check | Resultado |
|---|---|
| Repo en `/opt/mutualyf` | Rama `main`, sin drift (solo `.env.bak.*` que `deploy.sh` ignora) |
| nginx que corre vs. repo | **Idénticos** — el repo es la fuente de verdad |
| `server_name` servidos | Solo `intellix.com.ar`, `www`, `dev.intellix.com.ar`. **No hay otros dominios** |
| Certificados | `intellix.com.ar` (+`www`) y `dev.intellix.com.ar`, válidos |
| Emisión | `authenticator = webroot`, `webroot_path = /var/www/certbot` |
| Renovación | `certbot.timer` (systemd) + hook `renewal-hooks/deploy/reload-nginx.sh` |
| Widget | **No usa iframe** — inyecta `div`s. `frame-ancestors 'none'` no lo afecta |
| CORS del backend | Abierto: refleja cualquier `Origin`. **El widget funciona desde Vercel sin cambios** |

El cert de `app.intellix.com.ar` se emite igual que los otros: webroot sobre
`/var/www/certbot`, con el `server` block de HTTP sirviendo `/.well-known/acme-challenge/`
antes de pedirlo. La renovación lo toma automáticamente.

> 🔍 **Hallazgo lateral, fuera del alcance de esta tarea.** El CORS del backend refleja
> cualquier `Origin` con `access-control-allow-credentials: true`. Combinado con la cookie
> HttpOnly de refresh, permitiría que un sitio de terceros pida un token nuevo en nombre de
> un usuario logueado. Conviene restringirlo a una allowlist de orígenes. Anotado para
> tratar aparte — **no tocar durante esta migración**.

### La app (repo `..\mutualyf`)

Docker Compose sobre el VPS. nginx (`nginx/nginx.prod.conf`) hace de reverse proxy hacia
`backend:8000` y `frontend:3000`.

Rutas ocupadas en `intellix.com.ar`:

```
/                      → redirector por rol (no tiene contenido propio)
/login  /loginSuperadmin  /forgot-password  /reset-password  /auth/sso-callback
/admin/*  /operator/*  /superadmin/*  /chat  /forbidden
/api/  /health  /metrics  /uploads/     → backend
```

**La sesión se guarda en `localStorage`** (`frontend/lib/store.ts:59`), más cookies
`ia_role` / `ia_tenant` y una cookie HttpOnly de refresh.

### Correo

**No hay MX en el dominio raíz.** Hoy `@intellix.com.ar` no recibe nada. Lo único que
existe es el MX de `send.intellix.com.ar` (Resend) para transaccionales del producto.

---

## 2. Decisión de arquitectura

**Patrón elegido: subdominio dedicado para la app.**

```
intellix.com.ar  +  www   →  Landing (este repo)         →  Vercel
app.intellix.com.ar       →  App productiva              →  VPS 200.58.109.110
dev.intellix.com.ar       →  Staging de la app           →  VPS (ya existe)
send.intellix.com.ar      →  Resend transaccional        →  sin cambios
mail.intellix.com.ar      →  Correo de la marca          →  Ferozo 200.58.111.113
MX del raíz               →  mail.intellix.com.ar
```

El correo en Ferozo conviviendo con la web en Vercel **ya está probado en esta misma
cuenta**: `handicapp.com.ar` resuelve a `216.198.79.1` (Vercel) mientras
`mail.handicapp.com.ar` resuelve a `200.58.111.113` (Ferozo). Mismo patrón para Intellix.

### Por qué, y qué se descartó

Se evaluó el patrón alternativo —landing y app **en el mismo host, repartidas por path**
(como GitHub o Vercel)— y se descartó. Ambos patrones son legítimos y de uso corriente,
pero para este caso el subdominio gana por tres razones concretas:

1. **Aislamiento de fallas.** La landing se toca seguido (copy, diseño). Compartiendo
   nginx y compose con la app, un build roto de marketing puede tumbar producción.
2. **Sin parches.** Las dos son Next.js y ambas sirven sus chunks desde `/_next/`. En el
   mismo host habría que meter `assetPrefix: '/_landing'` — un parche que nadie va a
   entender dentro de seis meses y que se rompe al primer toque.
3. **CSP limpia.** La de la app es estricta (`img-src 'self' data: blob:`,
   `connect-src 'self'`). La landing necesita Cloudinary y el widget. Con hosts separados
   cada una tiene la suya, sin aflojar la de la app.

### Los links viejos no se rompen

Requisito duro: **a la empresa no se le puede pedir que cambie el link.** Se resuelve con
redirect permanente en el nginx del VPS:

```nginx
location /login {
    return 301 https://app.intellix.com.ar$request_uri;
}
```

El usuario escribe el link de siempre y el navegador lo lleva solo. Los bookmarks siguen
funcionando indefinidamente.

### Único impacto a usuarios

Como la sesión vive en `localStorage` y eso es **por origen**, al mover la app a
`app.intellix.com.ar` **todos pierden la sesión y se loguean una vez más**. Equivale a un
cerrar sesión. Ya validado como aceptable.

---

## 3. Plan de trabajo por bloques

Principio rector: **todo lo invisible primero; lo visible, último y junto.**

### Bloque 0 — Casa nueva para la app ✅ **COMPLETADO 2026-08-08**

Puramente aditivo: la app responde en **los dos hosts a la vez**. Nadie se enteró, nadie
se deslogueó. Se puede quedar así el tiempo que haga falta.

- [x] Registro `A`: `app.intellix.com.ar` → `200.58.109.110` (TTL 14400)
- [x] `nginx.prod.conf`: `server` block 80 + 443, copiando el de producción
      (mismo `set $tenant_id "mutual"`, mismos `location`)
- [x] Certificado Let's Encrypt emitido — vence **2026-11-06**, renovación automática
- [x] Validado con `nginx -t` antes de cada deploy
- [x] `https://app.intellix.com.ar/login` entra bien
- [x] **Sin 301 todavía** — el raíz sigue sirviendo la app directo, como debe ser

Commits en `main`: `87c608c` (server 80, para el desafío ACME) y `58b4148` (server 443,
una vez emitido el certificado). Se hizo en dos pasos **a propósito**: nginx no arranca si
`ssl_certificate` apunta a un archivo que todavía no existe.

Ambos entraron por `deploy.sh` desde un **git worktree temporal creado sobre
`origin/main`** — no desde `dev-local`, que tenía 18 commits de conectores y tres
migraciones de base de datos sin publicar. Ver la regla de deploy más arriba: sin ese
rodeo, `deploy.sh` los habría arrastrado a producción.

Validado al cerrar: `app`, `intellix.com.ar`, `www` y `dev` responden 200 en `/login` y
`/chat`; `/health` y el widget OK en ambos hosts; los cuatro registros DNS de Resend
intactos (DKIM presente, 218 chars).

### Bloque 1 — Correo en Ferozo (hosting #4729877, ya pago)

⚠️ **Se ejecuta FUSIONADO con el Bloque 3, en una única ventana.**

Configurar `intellix.com.ar` en el hosting hace que DonWeb reescriba el `A` del raíz.
Terminado el Bloque 0, la app ya tiene su casa en `app.intellix.com.ar` — **pero los
usuarios siguen entrando por el raíz**, porque los `301` todavía no existen. Y esos `301`
viven en el nginx del VPS: si el `A` deja de apuntar ahí, el VPS ni recibe la request. O
sea que el raíz sigue siendo crítico para los usuarios hasta el Bloque 3.

Como **los dos bloques tocan el mismo registro `A`**, separarlos son dos eventos de riesgo
y dos avisos a la mutual. Juntos son uno solo:

```
configurar Ferozo (pisa el A) → verificar Resend → crear casillas
                              → apuntar el A a Vercel → poner los 301 → verificar
```

El correo igual queda operativo antes de publicar, que era la condición.

- [x] Bloque 0 terminado, `app.intellix.com.ar` responde
- [x] **TTL bajado a 900** en el `A` del raíz y de `www` (2026-08-08). El mínimo que
      ofrece el panel de DonWeb; pasa la ventana de rollback de 4 horas a 15 minutos.
      Los caches viejos tardan hasta 4 hs en expirar — recién después el TTL nuevo rige
      en todos los resolvers.
- [x] **Respaldo del DKIM y demás registros de Resend** en `docs/dns-backup-resend.txt`
- [ ] Hosting #4729877 → Dominios configurados → Configurar → `intellix.com.ar`
- [ ] **Verificar el `A` del raíz inmediatamente después.** Si DonWeb lo apuntó al hosting
      (`200.58.111.113`), devolverlo a donde corresponda según en qué punto del plan estemos
- [ ] Correos → Crear cuenta (el selector ya debería ofrecer `intellix.com.ar`):
      - `hola@intellix.com.ar` — comercial, la que va en la web
      - `ventas@intellix.com.ar` — Enzo
      - `soporte@intellix.com.ar` — incidencias
- [ ] Alias → `hola@`: `info@`, `contacto@`
- [ ] **`noreply@intellix.com.ar`** (sin guión — es el `EMAIL_FROM` real de Resend)
- [ ] Verificar `MX` → `mail.intellix.com.ar`, y que ese host resuelva a `200.58.111.113`
- [ ] Verificar `SPF` del raíz (el panel suele cargarlo solo)
- [ ] Activar `DKIM` si el panel lo ofrece; el `_dmarc` ya existe en `p=none`
- [ ] Probar recepción **y** envío (que no caiga en spam)
- [ ] Configurar las casillas por **IMAP con SSL** (nunca POP), datos en el propio panel

> El `SPF` del raíz es independiente del de Resend, que vive en `send.intellix.com.ar` y
> no se toca.

#### ⚠️ Proteger el correo transaccional de la app (Resend)

La app manda **códigos OTP** (`backend/services/otp.py:139`) e **invitaciones**
(`invitations.py:97`) vía Resend. Si Resend pierde su autenticación, esos mails caen en
spam o son rechazados — y la gente no puede verificarse.

Resend y las casillas nuevas **no comparten registros**: Resend usa `MX` y `SPF` sobre
`send.intellix.com.ar`, las casillas usan el raíz. El DNS resuelve por nombre exacto, así
que no se pisan. Verificado además que **el raíz no tiene SPF hoy**, con lo cual no puede
darse el caso de dos SPF en el mismo nombre (que se invalidan mutuamente).

**El riesgo real es otro:** el DKIM de Resend vive en el **raíz**, no en `send.`. Al
configurar el dominio en el hosting, DonWeb puede reescribir la zona y llevárselo puesto.

**Config real de envío en el VPS** (`/opt/mutualyf/.env`):

```
SMTP_HOST=smtp.resend.com   ·   SMTP_PORT=587
EMAIL_FROM=Intellix <noreply@intellix.com.ar>
```

⚠️ **El remitente es del dominio RAÍZ**, no de `send.`. Por eso el DKIM vive en el raíz:
es lo que autentica ese `From`. Dos consecuencias para el Bloque 1:

- **Crear la casilla `noreply@intellix.com.ar`** — con ese nombre exacto, **sin guión**.
  Al poner MX en el raíz, las respuestas y rebotes de los OTP van a empezar a llegar ahí
  (hoy no llegan a ningún lado). Sin la casilla, se pierden en silencio.
- **El SPF del raíz debe incluir a Resend además de Ferozo.** Ferozo lo va a cargar solo
  con su propio `include`; hay que editarlo para sumar el de Resend. Es defensivo —hoy el
  envelope sale por `send.`, que tiene su SPF propio— pero evita una rotura futura.

Estado a preservar (relevado 2026-08-08):

```
MX   send.intellix.com.ar         → feedback-smtp.sa-east-1.amazonses.com   (prio 10)
TXT  send.intellix.com.ar         → v=spf1 include:amazonses.com ~all
TXT  resend._domainkey.intellix.com.ar → p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCv4kqp…
TXT  _dmarc.intellix.com.ar       → v=DMARC1; p=none;
```

> El DKIM está truncado a propósito. **Copiar el valor completo del panel ANTES de tocar
> nada** — sin él no se puede recrear.

Procedimiento:

- [ ] **Antes**: copiar los 4 registros completos desde la zona DNS de DonWeb
- [ ] Configurar el dominio en el hosting
- [ ] **Inmediatamente después**: verificar que los 4 siguen ahí; recrear los que falten
- [ ] Disparar un OTP real desde la app y confirmar que llega y no cae en spam

El `_dmarc` en `p=none` da algo de margen (reporta, no rechaza), pero no es red de
contención: si el DKIM se pierde, hay que reponerlo igual.

**Las contraseñas de las casillas las pone Alejo** — Claude no ingresa contraseñas en
formularios. Claude puede completar nombre y cuota, y hacer los alias completos.

### Bloque 2 — Terminar la web (el grueso, todo en local)

Nada de esto se ve en producción. Es donde va la mayor parte del tiempo.

- [ ] Diseño y contenido de las secciones
- [ ] **Arreglar el widget**: `src/app/layout.tsx:78` y `src/app/captura/page.tsx:71`
      apuntan a `dev.intellix.com.ar`. En producción tiene que ser el widget productivo,
      o la web pública conversa contra el entorno de desarrollo
- [ ] `src/components/ui/Navbar.tsx:109` y `:181` → `https://app.intellix.com.ar/login`
- [ ] Revisar `src/components/sections/Control.tsx:280,309` (los `BrowserBar` muestran
      `intellix.com.ar/operador` y `/admin` — son decorativos, pero conviene que digan
      la URL real)
- [ ] Deploy a Vercel con dominio de preview (`*.vercel.app`). **Sin dominio propio aún**
- [ ] Revisión visual completa

### Bloque 3 — El switch (día de semana, ~20 min de trabajo)

El único bloque con impacto visible. **Nunca un viernes ni un fin de semana.**

#### Los `301` — listos para pegar

Van en el `server` 443 de `intellix.com.ar www.intellix.com.ar`, **antes** del
`location /`. nginx elige el `location` más específico, así que estos ganan sobre el
catch-all sin tocar nada más.

```nginx
        # ── Mudanza a app.intellix.com.ar ────────────────────────────────────
        # Solo rutas de NAVEGACIÓN. El link viejo sigue funcionando: el
        # navegador sigue el 301 solo y lo cachea, así que el salto se paga
        # una vez y después va directo.
        location = /login             { return 301 https://app.intellix.com.ar$request_uri; }
        location = /loginSuperadmin   { return 301 https://app.intellix.com.ar$request_uri; }
        location = /forgot-password   { return 301 https://app.intellix.com.ar$request_uri; }
        location = /reset-password    { return 301 https://app.intellix.com.ar$request_uri; }
        location = /chat              { return 301 https://app.intellix.com.ar$request_uri; }
        location /auth/               { return 301 https://app.intellix.com.ar$request_uri; }
        location /admin               { return 301 https://app.intellix.com.ar$request_uri; }
        location /operator            { return 301 https://app.intellix.com.ar$request_uri; }
        location /superadmin          { return 301 https://app.intellix.com.ar$request_uri; }
```

#### 🚨 Los widgets de clientes viven en el dominio raíz

Hay **tres tenants con widget habilitado**: `galo`, `intellix`, `mutualyf` (verificado en
la base, 2026-08-08). El widget se carga así desde el sitio del cliente:

```html
<script src="https://intellix.com.ar/widget/widget.js" data-api-url="https://intellix.com.ar">
```

**Cuando el `A` del raíz apunte a Vercel, esos sitios dejan de tener widget.** No alcanza
con un `301`: el dominio ya no resuelve al VPS, así que el nginx ni se entera del pedido.
Y no controlamos los sitios de los clientes para cambiarles la URL.

Opciones, a decidir antes del Bloque 3:

1. **Rewrites en Vercel** para `/widget/*` y `/api/*` hacia el VPS. Mantiene todo
   funcionando sin tocar el sitio de ningún cliente. Costo: Vercel queda en el camino del
   widget (no de la app, que vive en `app.`).
2. **Migrar a los clientes** a `app.intellix.com.ar/widget/widget.js`. Más limpio, pero
   hay que coordinar con cada uno y no todos van a responder.
3. **Dejar `www` en el VPS** y publicar la landing solo en el raíz. Parcial: solo salva a
   quien haya embebido con `www`.

Sin resolver esto, el Bloque 3 rompe los widgets de clientes en producción.

⚠️ **`/api/`, `/uploads/`, `/health` y `/metrics` NO se redirigen.** Dos motivos:

1. Un `301` sobre un `POST` hace que varios clientes lo reintenten como `GET` y
   pierdan el body. Rompería el login y cualquier escritura.
2. Puede haber **widgets de clientes** embebidos apuntando a `intellix.com.ar/api`.
   Esos tienen que seguir funcionando contra el host viejo indefinidamente.

Por eso la mudanza es solo de navegación: las personas van al host nuevo, las
integraciones siguen donde están.

- [x] ~~24–48 hs antes: bajar el TTL~~ — hecho 2026-08-08, quedó en `900`
- [ ] Avisar a la mutual: "les va a pedir la contraseña una vez"
- [ ] nginx del VPS: agregar los `301` del raíz hacia `app.intellix.com.ar` para
      `/login`, `/admin`, `/operator`, `/superadmin`, `/chat`, `/forgot-password`,
      `/reset-password`, `/auth`
- [ ] Apuntar `A` de raíz y `www` a Vercel
- [ ] Limpiar el conflicto: **`www` tiene hoy un `A` y un `CNAME` a la vez**, lo cual es
      inválido según el estándar DNS. Dejar uno solo
- [ ] Verificar: landing en el raíz, `/login` redirige y entra, correo sigue llegando
- [ ] Restaurar el TTL a un valor normal

### Bloque 4 — Cierre

- [ ] Actualizar `CLAUDE.md` con la arquitectura final
- [ ] Revisar si el hosting Ferozo #4729877 sigue haciendo falta (hoy solo sirve
      `handicapp.site`)

---

## 4. Orden recomendado

```
Bloque 0  ──►  ✅ HECHO (2026-08-08)
Bloque 2  ──►  el grueso del tiempo, todo local, cero riesgo   ← EN CURSO
                    ↓
48 hs antes ──►  bajar el TTL del raíz a 300
                    ↓
Bloque 1+3 ──►  FUSIONADOS, martes o miércoles a la mañana
                 correo → publicar → 301, todo en una ventana
```

**Los bloques 1 y 3 se ejecutan juntos** porque tocan el mismo registro `A` del raíz.
Separarlos son dos ventanas de riesgo y dos avisos a la mutual; juntos, uno solo.

Dentro de esa ventana el correo va **primero**: si no, la web sale publicada con un mail
de contacto en el footer que rebota.

---

## 4 bis. Riesgos esperados

Nombrados a propósito: son los que **se espera** que aparezcan, no sorpresas.

| # | Riesgo | Prob. | Impacto | Mitigación |
|---|---|---|---|---|
| 1 | Todos los usuarios se re-loguean | **100%** | Bajo | Costo aceptado. Avisar antes |
| 2 | DonWeb pisa el `A` del raíz al configurar el hosting | Alta | Alto **solo si el Bloque 0 no está hecho** | Bloque 0 primero — desactiva el problema |
| 3 | Se pierde el DKIM de Resend → OTP a spam | Media | **Alto y silencioso** | Copiar el valor completo antes; verificar y probar un OTP después |
| 4 | Imprevisto en el switch del Bloque 3 | Media | Medio | TTL a 300 con 48 hs de anticipación |

El riesgo 3 es el más traicionero: **no falla ruidosamente**. Nadie ve un error; los mails
simplemente empiezan a caer en spam. Por eso la verificación con un OTP real es
obligatoria, no opcional.

Descartados con evidencia (ver "Verificado en el VPS"): el widget, el CORS, los
certificados, y la existencia de otros dominios afectados.

**El riesgo residual está todo en el Bloque 3.** Los bloques 0, 1 y 2 son reversibles en
segundos o minutos.

## 5. Rollback

| Bloque | Cómo se revierte | Cuánto tarda |
|---|---|---|
| 0 | Quitar el `server` block y `nginx -s reload` | segundos |
| 1 | Quitar los `MX` de la zona | minutos (TTL) |
| 2 | Nada que revertir, es local | — |
| 3 | Volver el `A` al VPS | **el TTL vigente** — por eso se baja antes |

El Bloque 3 es el único con riesgo real. Todo el resto es reversible al instante.

---

## 6. Verificación

```powershell
# A dónde resuelve cada host
Resolve-DnsName intellix.com.ar     -Type A  | Select-Object Name,IPAddress
Resolve-DnsName app.intellix.com.ar -Type A  | Select-Object Name,IPAddress
Resolve-DnsName intellix.com.ar     -Type MX | Select-Object Name,NameExchange

# La app sigue viva
Invoke-WebRequest https://app.intellix.com.ar/login -UseBasicParsing | Select-Object StatusCode

# Ver un redirect sin seguirlo
try { Invoke-WebRequest https://www.intellix.com.ar/login -UseBasicParsing -MaximumRedirection 0 -ErrorAction Stop }
catch { $r = $_.Exception.Response; [int]$r.StatusCode; $r.Headers['Location'] }
```

En el VPS, **siempre** antes de recargar nginx:

```bash
nginx -t && nginx -s reload
```
