---
workflow: general-video
flow: automation
storyboard: no
duration: ~60s
canvas: 1440x900
fps: 30
audio: silent (hero web video, siempre muted, pensado para loopear)
---

# Intellix — corto publicitario para el hero

Video de marca de ~60 segundos para el hero de la landing (intellix.com.ar).
Sin narración ni música (se reproduce muted en la web). Seis actos:
gancho tipográfico → chat web con fuente citada → WhatsApp → derivación a
operador humano → panel admin con métricas → cierre con logo.

## Design

- Tema claro cálido, idéntico a la web: bg `#fcfcfd`, soft `#f6f6f8`,
  ink `#1e2434`, dim `#656e82`.
- Acentos de marca: azul `#2f6bf0` (primario), violeta `#7c4dea`,
  cyan `#0891b2`, verde `#16a34a` (solo estados "en línea"/éxito).
- Tipografía: Space Grotesk (700/500) para display, system-ui para UI.
- UI recreada (mockups limpios de widget, WhatsApp, bandeja, panel) —
  NUNCA capturas pegadas. Sombras suaves, bordes redondeados 14–20px.
- Fondo con profundidad: glows radiales azul/violeta a baja opacidad con
  respiración lenta, en todas las escenas.

## Assets

- `assets/wordmark-on-light.png` — wordmark INTELLIX (letra oscura + isotipo color).
- `assets/icon.png` — isotipo hexagonal degradé cyan→azul→violeta.

## Contenido real (de producción, no inventar)

- Bot: "PixsBot" · responde ~2,5 s · cita la fuente del documento.
- Deriva a operador humano con contexto.
- Métricas reales del tenant: 29 consultas del mes, 29 resueltas por el bot.
