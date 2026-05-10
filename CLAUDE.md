# CLAUDE.md — Pixs Landing

Este archivo es el "brief permanente" del proyecto. Cuando abras Claude Code en esta carpeta, este es el primer archivo que va a leer. Mantenelo actualizado: si cambia algo del estilo, las secciones o la marca, edita este archivo y cualquier sesión nueva de Claude va a respetarlo.

---

## 1. Qué estamos construyendo

Landing page para **Pixs**, un estudio/desarrolladora de software. La idea es transmitir "full tech" — sentido moderno, futurista, con animaciones 3D y movimiento. Es la home pública de la marca, pensada para captar clientes y mostrar capacidades.

- **Una sola página** con scroll (todas las secciones en `/`).
- **Animaciones GSAP** (scroll triggers, reveals, parallax).
- **Hero con escena 3D** en Three.js / React Three Fiber.
- **Mobile-first responsive**, dark mode por defecto.

---

## 2. Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Estilos | Tailwind CSS |
| Animación 3D | Three.js + `@react-three/fiber` + `@react-three/drei` |
| Animación 2D/scroll | GSAP + ScrollTrigger |
| Iconos | lucide-react |
| Deploy | Vercel (recomendado) |

---

## 3. Estética — Cyber / glitch / futurista

### Paleta (ya en `tailwind.config.ts`)

- `bg.DEFAULT` `#05060a` — fondo casi-negro
- `bg.soft` `#0a0d14` — bloques alternos
- `neon.cyan` `#00f0ff` — acento principal
- `neon.magenta` `#ff00d4` — acento secundario / glitch
- `neon.violet` `#8b5cf6` — gradientes
- `neon.lime` `#aaff00` — destacar CTAs ocasionales
- `ink.DEFAULT` `#e6e9ef` — texto
- `ink.dim` `#8a92a6` — texto secundario

### Tipografía

- Display: **Space Grotesk** (titulares grandes)
- Mono: **JetBrains Mono** (etiquetas, números, código)

### Elementos visuales recurrentes

- Grid de fondo sutil (líneas cyan al 7% de opacidad).
- Scan lines suaves en algunas secciones.
- Glitch en titulares clave (al hover o al entrar en viewport).
- Bordes finos con glow en hover.
- Tarjetas con `backdrop-blur` y bordes 1px cyan/violet.

---

## 4. Estructura del sitio

Orden de secciones (de arriba abajo):

1. **Navbar** — fijo, transparente al inicio, blur al scrollear.
2. **Hero** — titular grande + escena 3D (esfera wireframe o mesh distorsionado) + 2 CTAs.
3. **Servicios** — qué hacemos (4–6 cards: web apps, mobile, MVPs, integraciones, IA, e-commerce).
4. **Stack tecnológico** — grilla con logos de tecnologías que usamos.
5. **Proceso** — timeline horizontal/vertical con los pasos de cómo trabajamos.
6. **Portfolio** — grid de proyectos hechos (imagen, título, stack, link).
7. **Contacto** — CTA final + formulario simple o mailto.
8. **Footer** — links, redes, copyright.

---

## 5. Estructura de archivos

```
web- pixs/
├── CLAUDE.md                      <- este archivo
├── README.md                      <- cómo correr el proyecto
├── package.json
├── next.config.mjs
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── .gitignore
├── .env.example
├── public/
│   └── assets/
│       ├── logo/                  <- CARGAR LOGO ACÁ (svg/png)
│       ├── portfolio/             <- CARGAR FOTOS DE PROYECTOS ACÁ
│       └── models/                <- modelos .glb si querés reemplazar la escena 3D
└── src/
    ├── app/
    │   ├── layout.tsx             <- fonts, metadata, html shell
    │   ├── page.tsx               <- compone todas las secciones
    │   └── globals.css            <- tailwind directives + utilities
    ├── components/
    │   ├── sections/
    │   │   ├── Hero.tsx
    │   │   ├── Services.tsx
    │   │   ├── TechStack.tsx
    │   │   ├── Process.tsx
    │   │   ├── Portfolio.tsx
    │   │   └── Contact.tsx
    │   ├── three/
    │   │   └── HeroScene.tsx      <- escena Three.js del hero
    │   └── ui/
    │       ├── Navbar.tsx
    │       ├── Footer.tsx
    │       └── GlitchText.tsx
    └── lib/
        ├── site.ts                <- datos de la marca (nombre, email, redes)
        └── content.ts             <- contenido editable (servicios, proyectos, stack)
```

---

## 6. Comandos

```bash
# instalar deps (primera vez)
npm install

# desarrollo (http://localhost:3000)
npm run dev

# build de producción
npm run build && npm start

# chequeo de tipos
npm run type-check
```

---

## 7. Qué tiene que cargar Alejo

1. **Logo** → `public/assets/logo/logo.svg` (ideal SVG). También `logo-mark.svg` (solo isotipo) y `logo-wordmark.svg` (solo texto) si los tenés separados.
2. **Favicon** → `src/app/favicon.ico` (32x32 o 48x48).
3. **Fotos de proyectos** → `public/assets/portfolio/proyecto-1.webp`, `proyecto-2.webp`, etc. Recomendado 1600x1000, WebP.
4. **(Opcional)** modelo 3D `.glb` → `public/assets/models/hero.glb` si queremos reemplazar la geometría procedural del hero por un modelo propio.

Cuando los tengas cargados, abrí Claude Code en esta carpeta y decí: *"ya cargué el logo y las fotos en public/assets, integralos en el sitio"*.

---

## 8. Datos de la marca (editar en `src/lib/site.ts` cuando estén definidos)

- **Nombre comercial**: Pixs *(placeholder — confirmar)*
- **Tagline**: *"Construimos el software que tu negocio necesita."* *(placeholder)*
- **Email**: hola@pixs.dev *(placeholder)*
- **Ubicación**: *(a definir)*
- **Redes**: LinkedIn / Instagram / GitHub *(URLs a definir)*

---

## 9. Reglas para Claude (al trabajar en este proyecto)

- **No instales librerías** sin avisar primero qué y para qué.
- **No agregues frameworks de UI** (shadcn, MUI, etc.) sin pedir. Tailwind + componentes propios es suficiente.
- **Mantené la estética cyber** — no metas estilos light o flat sin justificar.
- **Performance es prioridad**: la escena 3D del hero debe usar `Suspense`, lazy load, y degradar a CSS en mobile si es muy pesada.
- **Todo el contenido editable** vive en `src/lib/content.ts` y `src/lib/site.ts`. No hardcodear textos largos en los componentes.
- **Animaciones GSAP** siempre con `useGSAP` o cleanup en `useEffect`. Nunca dejar listeners colgados.
- **Imágenes** siempre con `next/image` y `alt` descriptivo.
- Antes de un cambio grande, proponé un plan en chat, no escribas directo.

---

## 10. Próximos pasos sugeridos

1. `npm install` para bajar dependencias.
2. `npm run dev` y revisar que la base levante en `localhost:3000`.
3. Cargar logo + fotos en `public/assets/`.
4. Editar `src/lib/site.ts` y `src/lib/content.ts` con el contenido real.
5. Iterar visual con Claude: hero, glitch, scroll, microinteracciones.
6. Deploy a Vercel (`vercel` CLI o conectar el repo de GitHub).
