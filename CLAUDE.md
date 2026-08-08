# CLAUDE.md — Landing de Intellix

Este archivo es el "brief permanente" del proyecto. Cuando abras Claude Code en esta carpeta, este es el primer archivo que va a leer. Mantenelo actualizado: si cambia algo del estilo, las secciones o la marca, edita este archivo y cualquier sesión nueva de Claude va a respetarlo.

---

## 1. Qué estamos construyendo

Landing de venta para **Intellix**, la plataforma SaaS de IA conversacional del equipo (ex "web de Pixs" — Pixs quedó solo como firma en el footer). Intellix convierte los documentos de una empresa en un asistente que responde consultas de clientes y empleados 24/7 en la web y en WhatsApp, y deriva a operadores humanos cuando hace falta.

**Objetivo de la web: cercanía y venta**, no ficha técnica. El visitante tipo NO es técnico. Reglas de copy:

- Lenguaje de beneficio, cero jerga ("RAG", "multi-tenant", etc. solo en `/tecnologia`).
- Posicionamiento general ("cualquier empresa") + **ejemplos concretos** (sección Escenarios) para que el visitante se vea reflejado.
- Mostrar el producto funcionando: mockup de chat en el hero + demo real con el widget (sección "Probalo").
- **No prometer features muertas**: el "aprendizaje de intenciones" fue eliminado del producto; "100+ idiomas" es capacidad del motor, no claim directo. El código real del producto vive en `..\mutualyf` — ante la duda, verificar ahí.

## 2. Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Estilos | Tailwind CSS |
| Animación / scroll | GSAP + ScrollTrigger (`Reveal`) · framer-motion (layout, AnimatePresence, micro-interacciones — permite portar componentes de 21st.dev/Aceternity) |
| Iconos | lucide-react |
| Demo del producto | Video real del widget en el Hero (`/media/hero-widget-loop.mp4`). **El widget embebido se eliminó de la landing** — decisión de producto, 2026-08-08 |
| Deploy | Vercel (recomendado) |

## 3. Estética — cálida, luminosa y humana

Tema **claro por defecto** (oscuro opcional con el toggle). Los acentos salen del degradé del logo: cyan → azul → violeta. Nada de glitch/scanlines/neón: tarjetas `card-soft` (bordes redondeados + sombra suave), grid de fondo muy sutil, halos `section-glow`.

### Tokens (CSS vars en `globals.css`, expuestos en `tailwind.config.ts`)

- `bg` `#fafaf8` / `bg-soft` `#f4f3ef` — fondos cálidos off-white
- `ink` / `ink-dim` — texto
- `brand.cyan` / `brand.blue` / `brand.violet` / `brand.green` — acentos de marca
- Alias legacy `neon.*` (mapea a los mismos vars; lo usan los componentes de `/tecnologia`)
- Utilidades: `.card-soft`, `.section-glow`, `.text-brand-gradient`, `.bg-tech-grid`

### Tipografía

- Display: **Space Grotesk** · Mono: **JetBrains Mono** (solo en `/tecnologia`)

## 4. Estructura del sitio

**`/` (la landing de venta)** — orden de secciones:

1. `Navbar` — logo Intellix, anclas, CTA "Pedir demo" (WhatsApp).
2. `Hero` — dolor universal + mockup de conversación animado (con cita de fuente y chip de derivación).
3. `HowItWorks` — 3 pasos en lenguaje cliente (`#como-funciona`).
4. ~~`TryIt`~~ — **fuera de la home**. Dependía del widget embebido, que se eliminó. El componente sigue en `sections/` pero no está montado.
5. `Scenarios` — 4 mini-historias con ejemplo de pregunta/respuesta (`#escenarios`).
6. `Trust` — "diseñado para no inventar": citas, honestidad, contradicciones, aislamiento (`#confianza`).
7. `Channels` — widget web + WhatsApp oficial + panel de operadores (`#canales`).
8. `Launch` — puesta en marcha en 48 hs (`#empezar`).
9. `Team` — los 3 founders (`#equipo`).
10. `IntellixCTA` — cierre con CTAs a WhatsApp.
11. `Footer` — navegación + contacto + "Un producto de Pixs".

**`/tecnologia`** — ficha técnica para el visitante de sistemas (features, stack, métricas, entregables). **`/intellix`** — redirect a `/` (compatibilidad).

## 5. Dónde vive cada cosa

```
src/
├── app/
│   ├── layout.tsx          <- metadata Intellix + WhatsAppFab (el widget embebido se eliminó)
│   ├── page.tsx            <- home de venta
│   ├── tecnologia/page.tsx <- ficha técnica
│   └── intellix/page.tsx   <- redirect a /
├── components/
│   ├── sections/           <- secciones de la home (Hero, TryIt, Scenarios, Trust, ...)
│   ├── intellix/           <- componentes de /tecnologia + Reveal + IntellixCTA (compartido)
│   └── ui/                 <- Navbar, Footer, ThemeToggle, Preloader, WhatsAppFab (activo)
└── lib/
    ├── site.ts             <- marca Intellix: logos, WhatsApp, email, byline Pixs
    │                          + site.app (la app vive en app.intellix.com.ar)
    ├── intellix.ts         <- TODO el copy de la landing + ficha técnica (intellix.tech.*)
    ├── content.ts          <- team
    └── theme.ts            <- tema claro default; clave "intellix-web-theme"
                               (¡no usar "intellix-theme": la usa el panel del producto en localhost!)
```

## 6. Comandos

```bash
npm install          # primera vez
npm run dev          # http://localhost:3000 (usar -p 3005 si el 3000 está ocupado)
npm run build && npm start
npm run type-check
```

## 7. Datos de la marca (`src/lib/site.ts`)

- **Producto**: Intellix — https://www.intellix.com.ar
- **Firma**: "Un producto de Pixs" (solo footer)
- **Email**: hola@intellix.com.ar *(la casilla todavía NO existe — ver `docs/INFRAESTRUCTURA.md`, Bloque 1)*
- **WhatsApp**: 5492477509003 — los mensajes precargados viven en `intellix.whatsapp`

## 8. Infraestructura y publicación

**Antes de tocar dominios, DNS, deploy o correo: leer `docs/INFRAESTRUCTURA.md`.**

Lo esencial: `intellix.com.ar` **hoy sirve la app productiva** que usan Josué y la mutual
(VPS `200.58.109.110`, repo `..\mutualyf`). Esta landing todavía no está publicada.

La app ya se mudó a `app.intellix.com.ar` (hecho). La landing va al **dominio raíz, en el
mismo VPS**, servida por nginx como archivos estáticos (`output: "export"`), con `301`
para que nadie tenga que cambiar su link.

⚠️ **El registro `A` del raíz no se mueve.** De ese dominio cuelgan el webhook de WhatsApp
(registrado en el panel de Meta **de la mutual**, sin acceso nuestro) y los widgets
embebidos en sitios de clientes. Por eso la landing no va a Vercel.

⚠️ **No configurar `intellix.com.ar` en el hosting Ferozo** sin leer el doc: reescribe la
zona DNS y puede llevarse el DKIM de Resend, con lo que dejan de llegar los mails de
recuperación de contraseña y los OTP.

## 9. Reglas para Claude (al trabajar en este proyecto)

- **No instales librerías** sin avisar primero qué y para qué.
- **No agregues frameworks de UI** (shadcn, MUI, etc.). Tailwind + componentes propios.
- **Mantené la estética cálida/humana** — nada de glitch, scanlines ni neón en la home.
- **Copy siempre en lenguaje de cliente** en la home; lo técnico va a `/tecnologia`.
- **Performance**: animaciones solo con transform/opacity, GSAP con cleanup (`gsap.context` + revert).
- **Todo el contenido editable** vive en `src/lib/intellix.ts` y `src/lib/site.ts`. No hardcodear textos en componentes.
- **Imágenes** siempre con `next/image` y `alt` descriptivo.
- Antes de un cambio grande, proponé un plan en chat, no escribas directo.
