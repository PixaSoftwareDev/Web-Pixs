/**
 * Contenido y marca del sub-producto Intellix.
 * Todo el texto editable de la página /intellix vive acá.
 */

export const intellix = {
  name: "Intellix",
  // Logos (swap por tema con las clases .logo-on-dark / .logo-on-light de globals.css).
  logo: {
    // Letra blanca + isotipo color → fondo oscuro (dark).
    // e_trim recorta el padding desigual y c_lpad normaliza ambos al mismo
    // lienzo (1500x470) para que dark y light se rendericen al mismo tamaño.
    dark: "https://res.cloudinary.com/dukv3ov6t/image/upload/e_trim/c_lpad,w_1500,h_470,b_transparent/v1780009423/INTELLIX_BLACk_1_eka1bo.png",
    // Letra negra + isotipo color → fondo claro (light).
    light:
      "https://res.cloudinary.com/dukv3ov6t/image/upload/e_trim/c_lpad,w_1500,h_470,b_transparent/v1780009528/INTELLIX_WHITE_1_s9gvxw.png",
    // Isotipo a color (sirve en ambos temas).
    icon: "https://res.cloudinary.com/dukv3ov6t/image/upload/c_pad,w_400,h_400,b_transparent/v1780009417/IMG_0131_df525n.png",
  },

  hero: {
    eyebrow: "// Producto · IA conversacional",
    tagline: "Convertí el conocimiento de tu organización en un asistente que responde 24/7.",
    description:
      "Una plataforma de inteligencia artificial conversacional para empresas que centralizan su información y necesitan responder consultas de clientes y empleados al instante — sin perder el toque humano cuando hace falta.",
    cta: "Solicitar demo",
    subheadline:
      "Documentos, conversaciones y operadores humanos integrados en una sola plataforma. Lista para producción, lista para escalar.",
  },

  // Párrafos de la sección "El producto".
  about: [
    "Intellix es una plataforma SaaS de IA conversacional multi-tenant diseñada para organizaciones que necesitan transformar sus documentos en respuestas inmediatas.",
    "El sistema ingiere el contenido institucional de cada empresa (políticas, manuales, contratos, FAQs, normativas), lo procesa con técnicas avanzadas de Retrieval-Augmented Generation (RAG) y responde consultas en lenguaje natural en 2 a 4 segundos, con más del 95% de precisión y citas a las fuentes originales.",
    "Cuando el asistente no puede resolver una consulta con confianza, deriva automáticamente a un operador humano de la organización. El operador recibe la conversación completa, los datos del solicitante y puede continuar la atención sin fricciones.",
    "Cada cliente cuenta con una instancia completamente aislada — sus documentos, usuarios y conversaciones nunca se mezclan. Personalizable con branding propio y embebible en cualquier sitio web.",
  ],

  howItWorks: [
    {
      step: "01",
      title: "Ingesta inteligente",
      description:
        "Los administradores cargan documentos en PDF, Word o texto plano. Intellix los segmenta, vectoriza e indexa en bases optimizadas para búsqueda semántica. Detecta duplicados y valida la calidad del contenido automáticamente.",
    },
    {
      step: "02",
      title: "Consulta conversacional",
      description:
        "Los usuarios preguntan en lenguaje natural. Intellix reescribe la consulta, busca en paralelo en múltiples fuentes (semántica + keywords + grafo de entidades) y genera una respuesta concisa con citas verificables.",
    },
    {
      step: "03",
      title: "Derivación a humano",
      description:
        "Si el asistente no puede resolver la consulta con confianza tras varios intentos, ofrece derivar a un operador. El humano recibe el historial completo y los datos del solicitante para retomar la conversación sin pedir explicaciones.",
    },
    {
      step: "04",
      title: "Mejora continua",
      description:
        "Cada consulta alimenta el sistema de aprendizaje de intenciones. Intellix descubre patrones de uso, identifica preguntas frecuentes nuevas y sugiere ajustes al administrador.",
    },
  ],

  useCases: [
    {
      title: "Atención al cliente automatizada",
      description:
        "Respuestas instantáneas a las consultas más frecuentes, con derivación a humanos para casos complejos.",
      icon: "Headset",
    },
    {
      title: "Soporte interno para empleados",
      description:
        "Consultas a políticas, normativas y procedimientos sin saturar al equipo de RRHH.",
      icon: "Users",
    },
    {
      title: "Onboarding inteligente",
      description:
        "Nuevos empleados aprenden los procesos de la empresa de forma conversacional.",
      icon: "GraduationCap",
    },
    {
      title: "Sectores regulados",
      description:
        "Salud, legal y finanzas: respuestas con citas explícitas a la documentación oficial.",
      icon: "ScrollText",
    },
    {
      title: "Atención al afiliado / socio",
      description:
        "Mutuales, obras sociales y cooperativas resolviendo consultas con derivación a operadores reales.",
      icon: "HeartHandshake",
    },
  ],

  features: [
    { text: "Respuestas en 2-4 segundos con citas a documentos", icon: "Zap" },
    { text: "Widget embebible en cualquier sitio web", icon: "Code2" },
    { text: "Multi-tenant real con aislamiento de datos", icon: "Building2" },
    { text: "White-label completo (logo, colores, nombre)", icon: "Palette" },
    { text: "Derivación a operadores con contexto completo", icon: "Users" },
    { text: "Panel admin para documentos, usuarios y métricas", icon: "LayoutDashboard" },
    { text: "Soporta 100+ idiomas", icon: "Globe" },
    { text: "Detección de duplicados y validación de calidad", icon: "SearchCheck" },
    { text: "Aprendizaje de intenciones automático", icon: "TrendingUp" },
    { text: "Backups diarios automatizados", icon: "DatabaseBackup" },
    { text: "Chat público + widget embed", icon: "MessageCircle" },
    { text: "Rate limiting + protección anti brute-force", icon: "ShieldCheck" },
  ],

  stack: [
    {
      group: "Backend",
      items: ["FastAPI", "Python 3.11", "Celery + Redis", "Docker"],
    },
    {
      group: "Frontend",
      items: ["Next.js 14", "React 18", "TypeScript", "Tailwind", "ShadCN/ui"],
    },
    {
      group: "Datos",
      items: [
        "PostgreSQL 16 (schema-per-tenant)",
        "Qdrant (vectorial)",
        "Neo4j (grafo)",
        "Redis",
        "MinIO",
      ],
    },
    {
      group: "Inteligencia artificial",
      items: [
        "Groq (Llama 3.3 70B + Llama 4 Scout)",
        "multilingual-e5-large",
        "bge-reranker",
        "GLiNER",
      ],
    },
    {
      group: "Observabilidad",
      items: ["Prometheus", "Grafana", "Loki", "Jaeger"],
    },
  ],

  metrics: [
    { value: "~1.2s", label: "tiempo medio de respuesta" },
    { value: ">95%", label: "precisión con contexto disponible" },
    { value: "99.5%", label: "disponibilidad objetivo" },
    { value: "100+", label: "idiomas soportados nativamente" },
    { value: "50-200", label: "usuarios concurrentes por instancia" },
    { value: "24h", label: "RPO en peor caso de desastre" },
  ],

  deliverables: [
    "Instancia dedicada y aislada en infraestructura administrada",
    "Panel de administración completo",
    "Widget embebible para tu sitio web",
    "Integración con tu branding (logo, colores, nombre del asistente)",
    "Backups automáticos diarios",
    "Soporte técnico y onboarding del equipo",
  ],

  closing: {
    title: "¿Querés ver Intellix funcionando con los documentos de tu organización?",
    description:
      "Te armamos una prueba personalizada en 48hs con tu propia documentación, sin compromiso.",
    primaryCta: "Pedir demo",
    secondaryCta: "Hablar con un especialista",
  },

  // Versión corta para la card de portfolio en la home.
  short: {
    description:
      "Plataforma SaaS de IA conversacional multi-tenant. Convierte la documentación de tu organización en un asistente inteligente que responde en segundos y deriva a humanos cuando hace falta.",
    stack: "FastAPI · Next.js · Postgres · Qdrant · Groq LLMs",
  },

  // Mensajes pre-cargados para los CTA por WhatsApp.
  whatsapp: {
    demo: "Hola Pixs! Me interesa una demo de Intellix para mi organización.",
    specialist: "Hola Pixs! Quiero hablar con un especialista sobre Intellix.",
  },
} as const;
