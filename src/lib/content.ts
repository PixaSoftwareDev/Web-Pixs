/**
 * Contenido editable del sitio. Cambiá acá los textos, no en los componentes.
 */

export const services = [
  {
    title: "Web Apps",
    description:
      "Aplicaciones web modernas, escalables y rápidas. Next.js, React, Node.",
    icon: "Globe",
  },
  {
    title: "Mobile Apps",
    description:
      "Apps nativas y cross-platform con React Native y Expo. iOS + Android.",
    icon: "Smartphone",
  },
  {
    title: "MVPs y Productos",
    description:
      "De la idea al producto vivo. Diseño, build, deploy y métricas en semanas.",
    icon: "Rocket",
  },
  {
    title: "Integraciones & APIs",
    description:
      "Conectamos sistemas, automatizamos procesos y diseñamos APIs robustas.",
    icon: "Cable",
  },
  {
    title: "IA & Automatización",
    description:
      "Agentes, RAG, copilots y workflows con LLMs aplicados a tu negocio.",
    icon: "Sparkles",
  },
  {
    title: "E-commerce",
    description:
      "Tiendas headless y plataformas a medida. Shopify, Stripe, integraciones.",
    icon: "ShoppingBag",
  },
] as const;

export const stack = [
  { name: "Next.js", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "TailwindCSS", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "PostgreSQL", category: "data" },
  { name: "Redis", category: "data" },
  { name: "AWS", category: "infra" },
  { name: "Vercel", category: "infra" },
  { name: "Docker", category: "infra" },
  { name: "Three.js", category: "frontend" },
] as const;

export const process = [
  {
    step: "01",
    title: "Discovery",
    description:
      "Entendemos el negocio, los usuarios y el alcance. Salimos con un plan claro.",
  },
  {
    step: "02",
    title: "Diseño & Arquitectura",
    description:
      "Wireframes, UI, modelo de datos y stack. Validamos antes de codear.",
  },
  {
    step: "03",
    title: "Desarrollo Iterativo",
    description:
      "Sprints cortos, demos semanales, feedback continuo. Vos siempre al tanto.",
  },
  {
    step: "04",
    title: "Deploy & Monitoreo",
    description:
      "CI/CD, observabilidad, performance. Tu producto live y estable.",
  },
  {
    step: "05",
    title: "Soporte & Evolución",
    description:
      "Iteramos en base a métricas reales y crecimiento del producto.",
  },
] as const;

export const team = [
  {
    name: "Enzo Batistelli",
    role: "Co-founder & Head of Sales",
    image:
      "https://res.cloudinary.com/dukv3ov6t/image/upload/v1778943815/WhatsApp_Image_2026-05-12_at_17.28.59_uka6bf.png",
    accent: "magenta",
  },
  {
    name: "Guillermo Fernandez",
    role: "Co-founder & Lead Developer",
    image:
      "https://res.cloudinary.com/dukv3ov6t/image/upload/v1778945805/WhatsApp_Image_2026-05-16_at_12.32.20_p0rhft.png",
    accent: "violet",
  },
  {
    name: "Alejo Maros",
    role: "Co-founder & Lead Developer",
    image:
      "https://res.cloudinary.com/dukv3ov6t/image/upload/v1778943927/alejoperfil_mbqj1a.png",
    accent: "cyan",
  },
] as const;

export const portfolio = [
  {
    title: "Proyecto Uno",
    description: "Plataforma SaaS para gestión de equipos.",
    stack: ["Next.js", "Postgres", "Stripe"],
    image: "/assets/portfolio/proyecto-1.webp",
    link: "#",
  },
  {
    title: "Proyecto Dos",
    description: "App mobile de fitness con IA.",
    stack: ["React Native", "OpenAI", "Supabase"],
    image: "/assets/portfolio/proyecto-2.webp",
    link: "#",
  },
  {
    title: "Proyecto Tres",
    description: "E-commerce headless con catálogo dinámico.",
    stack: ["Next.js", "Shopify", "Sanity"],
    image: "/assets/portfolio/proyecto-3.webp",
    link: "#",
  },
  {
    title: "Proyecto Cuatro",
    description: "Dashboard de analytics con visualizaciones 3D.",
    stack: ["React", "Three.js", "D3"],
    image: "/assets/portfolio/proyecto-4.webp",
    link: "#",
  },
] as const;
