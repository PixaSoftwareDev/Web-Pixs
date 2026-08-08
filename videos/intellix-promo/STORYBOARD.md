# Storyboard — Intellix promo (~60 s · 1440×900 · 30 fps · mudo)

Arco: pregunta sin responder → el bot resuelve con fuentes → en todos los
canales → y cuando hace falta, humanos → todo medido → marca.

## Frame 1 — Gancho

- id: `01-gancho`
- type: hook
- status: outline
- src: compositions/frames/01-gancho.html
- duration: 7s
- blueprint: `kinetic-type-beats` (+ rules: `waterfall-entry`, `gradient-text-sweep`)
- beats: Sobre el fondo claro con glows respirando, entra en cascada
  "Tu cliente pregunta **a cualquier hora**." (acento con barrido de degradé
  azul→violeta). Beat 2 (hard swap): "¿Quién le **responde**?" queda sola,
  con un reloj minimal 24 hs girando sutil arriba. Hold breve.

## Frame 2 — Chat web

- id: `02-chat-web`
- type: product_intro
- status: outline
- src: compositions/frames/02-chat-web.html
- duration: 12s
- blueprint: `prompt-type-submit-generate` (+ rules: `discrete-text-sequence`,
  `spring-pop-entrance`, `ambient-glow-bloom`)
- beats: Card del widget de chat Intellix (header con isotipo + "PixsBot ·
  En línea") pop-in al centro. En el input se tipea "¿Hacen envíos al
  interior? ¿Cuánto demoran?" → submit → dots de "escribiendo" → la
  respuesta streamea en 2 bloques y debajo aparece el chip de cita
  "📄 Fuente: politica-envios.pdf". Frase overlay lateral:
  "Responde desde **tus documentos**". Badge "2,5 s" pop junto a la respuesta.

## Frame 3 — WhatsApp

- id: `03-whatsapp`
- type: feature_showcase
- status: outline
- src: compositions/frames/03-whatsapp.html
- duration: 9s
- blueprint: `device-surface-showcase` (static tour) (+ rules:
  `spring-pop-entrance`, `sine-wave-loop`)
- beats: Un teléfono (solo pantalla, sin marco grueso) con conversación de
  WhatsApp de OTRO rubro (turnos de una clínica): pregunta del cliente
  entra, respuesta del bot con horario concreto. El teléfono flota con
  respiración leve. Frase: "En la web **y en WhatsApp**". El header muestra
  el tilde verde oficial.

## Frame 4 — Derivación humana

- id: `04-derivacion`
- type: benefit_highlight
- status: outline
- src: compositions/frames/04-derivacion.html
- duration: 12s
- blueprint: `camera-journey` (sub-shape A: action roundtrip) (+ rules:
  `viewport-change`, `spring-pop-entrance`, `counting-dynamic-scale`)
- beats: Arranca cerca del chat: el cliente escribe "Necesito hablar con
  una persona" → burbuja del bot "Te derivo con nuestro equipo 👤" con chip
  violeta "Derivación". La cámara viaja (pan+zoom del mundo) hacia la
  bandeja del operador: notificación entra con ring, la conversación
  aparece arriba de la lista con badge "Esperando", el operador la toma
  (badge pasa a "Activa" azul). Frase: "Y cuando hace falta, **tu equipo**".

## Frame 5 — Panel admin

- id: `05-panel`
- type: feature_showcase
- status: outline
- src: compositions/frames/05-panel.html
- duration: 10s
- blueprint: `dataviz-countup` (+ rules: `counting-dynamic-scale`,
  `stat-bars-and-fills`, `spring-pop-entrance`)
- beats: Panel admin minimal: tres stat-cards suben en cascada — "29
  consultas este mes" (count-up), "29 resueltas por el bot", "2,5 s tiempo
  de respuesta" — más una fila "politica-envios.pdf" con barra de progreso
  de subida que completa con check verde. Mini gráfico de barras crece.
  Frase: "Todo bajo **tu control**".

## Frame 6 — Cierre de marca

- id: `06-cierre`
- type: branding
- status: outline
- src: compositions/frames/06-cierre.html
- duration: 10s
- blueprint: `kinetic-type-beats` → `logo-assemble-lockup` (+ rules:
  `waterfall-entry`, `spring-pop-entrance`, `ambient-glow-bloom`)
- beats: Tres beats tipográficos secos: "Tus documentos." / "Tus
  respuestas." / "Tu marca." → el escenario se limpia y el isotipo hace
  spring-bloom al centro con glow, el wordmark INTELLIX se asienta al lado,
  y debajo aparece "intellix.com.ar". Hold largo final (loopea limpio
  contra el frame 1).
