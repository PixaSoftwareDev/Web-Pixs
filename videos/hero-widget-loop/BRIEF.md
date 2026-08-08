---
workflow: general-video
flow: automation
storyboard: no
duration: ~18s (loop perfecto: estado final = estado inicial)
canvas: 1440x900
fps: 30
audio: silent (video de hero, autoplay muted loop)
---

# Hero loop — el widget de Intellix en un sitio real

Video para el hero de intellix.com.ar. Reemplaza al narrativo de 60s (ese
queda para redes). Reglas:

- SIN frases de marketing adentro — el H1 de la web pone el mensaje.
- El video ES la app: réplica 1:1 del widget real de Intellix flotando
  sobre un sitio web genérico (esqueleto gris), tal como lo muestra la
  preview de "Personalizar widget" del panel real.
- Loop invisible: arranca con el launcher cerrado, el widget se abre,
  corre la conversación (pregunta → respuesta con fuente → derivación a
  humano), se cierra, y el último frame = primer frame.

## Fidelidad (fuente de verdad)

- `media/capturas/admin-widget-personalizar.jpg` — preview real: browser
  bar oscura "tu-sitio.com", página esqueleto, widget flotante.
- `media/capturas/intellix-chat-demo.gif` — conversación real.
- Informe de diseño del frontend de mutualyf (colores/textos exactos del
  widget, chip de fuente y derivación) — ver DESIGN.md cuando esté.

## Guión (borrador, ~18s)

1. 0–1.5s — Sitio esqueleto quieto, launcher violeta abajo-derecha late suave.
2. 1.5–2.5s — Click → el widget se abre desde el launcher.
3. 2.5–6s — Saludo de PixsBot · el cliente tipea "¿Hacen envíos al interior?" y envía.
4. 6–9s — Dots de escribiendo → respuesta + cita de fuente (diseño real).
5. 9–12.5s — Cliente: "¿Puedo hablar con una persona?" → derivación (estado real del widget).
6. 12.5–15s — Mensaje del operador humano llega (como lo muestra la app).
7. 15–18s — Hold breve → el widget se cierra al launcher → frame final = inicial.
