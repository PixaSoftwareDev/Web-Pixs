/**
 * Partículas finas ("motas de data") que ascienden lento por el fondo del Hero.
 * Solo animan transform/opacity (GPU) y se apagan con prefers-reduced-motion
 * vía la regla global de globals.css.
 *
 * Las configuraciones son DETERMINÍSTICAS (derivadas del índice, sin Math.random)
 * para que el render del servidor y el del cliente coincidan exacto.
 */

const COLORS = [
  "rgb(var(--c-neon-cyan))",
  "rgb(var(--c-neon-violet))",
  "rgb(var(--c-neon-magenta))",
];

const COUNT = 26;

// Pseudo-aleatorio determinístico: solo para distribuir las partículas.
// Se redondea a 3 decimales para que servidor y cliente generen EXACTAMENTE
// el mismo valor (Math.sin difiere en los últimos dígitos entre Node y el
// navegador, lo que rompía la hidratación).
const rand = (seed: number) => {
  const x = Math.sin(seed * 99.13) * 43758.5453;
  return Math.round((x - Math.floor(x)) * 1000) / 1000;
};

const particles = Array.from({ length: COUNT }, (_, i) => {
  const left = rand(i + 1) * 100; // %
  const size = 1 + rand(i + 2) * 2.4; // px
  const dur = 14 + rand(i + 3) * 14; // s
  const delay = -rand(i + 4) * 20; // s (negativo: arrancan repartidas, no todas juntas)
  const drift = (rand(i + 5) - 0.5) * 80; // px de deriva horizontal
  const opacity = 0.25 + rand(i + 6) * 0.4;
  const color = COLORS[i % COLORS.length];
  return { left, size, dur, delay, drift, opacity, color };
});

export default function HeroParticles() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className="hero-particle"
          style={
            {
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              "--p-dur": `${p.dur}s`,
              "--p-delay": `${p.delay}s`,
              "--p-drift": `${p.drift}px`,
              "--p-opacity": p.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
