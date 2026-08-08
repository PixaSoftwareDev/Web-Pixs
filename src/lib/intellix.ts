/**
 * Contenido de la landing de Intellix.
 * Todo el texto editable vive acá — no hardcodear copy en los componentes.
 * Regla: lenguaje de beneficio, cero jerga técnica en la home.
 * La ficha técnica (stack, métricas) vive al final y se usa solo en /tecnologia.
 */

export const intellix = {
  name: "Intellix",
  logo: {
    // Letra blanca + isotipo color → fondo oscuro (dark).
    dark: "https://res.cloudinary.com/dukv3ov6t/image/upload/e_trim/c_lpad,w_1500,h_470,b_transparent/v1780009423/INTELLIX_BLACk_1_eka1bo.png",
    // Letra negra + isotipo color → fondo claro (light).
    light:
      "https://res.cloudinary.com/dukv3ov6t/image/upload/e_trim/c_lpad,w_1500,h_470,b_transparent/v1780009528/INTELLIX_WHITE_1_s9gvxw.png",
    // Isotipo a color (sirve en ambos temas).
    icon: "https://res.cloudinary.com/dukv3ov6t/image/upload/c_pad,w_400,h_400,b_transparent/v1780009417/IMG_0131_df525n.png",
  },

  // === HOME ===

  hero: {
    // Posicionamiento por contraste: ataca a la categoría y se diferencia en 5 palabras.
    // Anti-objeciones bajo los CTAs: fricción cero.
    ticks: ["Sin tarjeta", "Andando en 48 hs"],
    titleA: "Otros bots responden.",
    titleAccent: "Intellix resuelve.",
    highlight: "Sin perder el trato humano.",
    description:
      "Intellix aprende de los documentos de tu empresa y responde las consultas de clientes y empleados al instante, las 24 horas. Y cuando hace falta una persona, deriva la conversación a tu equipo con todo el contexto.",
    primaryCta: "Quiero mi prueba de 48 hs",
    secondaryCta: "Verlo en acción",
    // Conversación REAL del asistente en producción (capturada del tenant propio,
    // condensada para lectura en pantalla). El bot y el estilo son los del widget real.
    chat: {
      botName: "PixsBot",
      status: "En línea",
      messages: [
        { from: "user", text: "Hola! ¿Qué servicios ofrecen?" },
        {
          from: "bot",
          text: "Pixs ofrece seis servicios: desarrollo web, apps mobile, MVPs, integraciones y APIs, soluciones de IA y e-commerce.",
        },
        { from: "user", text: "¿Y cómo puedo contactarlos?" },
        {
          from: "bot",
          text: "Podés escribirnos por WhatsApp, email o LinkedIn. Y si querés, te paso con alguien del equipo ahora mismo.",
          handoff: true,
        },
      ],
      // Datos reales del dashboard (30 días) — chips de prueba flotando junto al chat.
      proof: [
        { text: "Responde en 2,5 s", icon: "Zap" },
        // Conteo concreto > porcentaje perfecto: "100%" suena inflado, "29 de 29" es creíble.
        { text: "29 de 29 consultas resueltas este mes", icon: "CheckCheck" },
      ],
    },
  },

  // "El viaje de una consulta" — la experiencia scroll-driven que abre la página.
  // El scroll del visitante reproduce el recorrido real de una pregunta.
  // El viaje ahora cuenta la historia del DUEÑO (el hero ya muestra la conversación):
  // de tus documentos a tu asistente, con la cita de fuente como diferencial.
  journey: {
    eyebrow: "Así funciona",
    scenes: [
      "Todo empieza con tus documentos.",
      "Intellix los aprende en minutos.",
      "Y responde con tu información — diciendo de dónde la sacó.",
      "De cero a atender clientes: 48 horas.",
    ],
    docs: ["Política de envíos.pdf", "Preguntas frecuentes.docx", "Lista de precios.xlsx"],
    // Mini-documentos "reales" para la escena 1 (legibles, no wireframes).
    docsDetail: [
      {
        kind: "PDF",
        title: "Política de envíos",
        lines: ["Cobertura: todo el país", "Interior: 3 a 5 días hábiles", "CABA y GBA: 24 a 48 hs"],
        highlight: 1,
      },
      {
        kind: "DOCX",
        title: "Preguntas frecuentes",
        lines: ["¿Atienden los sábados?", "¿Qué medios de pago aceptan?", "¿Hacen factura A?"],
        highlight: -1,
      },
      {
        kind: "XLSX",
        title: "Lista de precios",
        lines: ["Envío CABA — $4.500", "Envío interior — $6.900", "Gratis desde — $80.000"],
        highlight: 2,
      },
    ],
    answer:
      "¡Sí! Al interior demora de 3 a 5 días hábiles, y desde $80.000 el envío es gratis.",
    source: "Fuente: politica-envios.pdf",
    learning: "Subís el archivo y ya está",
    final: {
      stat: "48 hs",
      line: "Te lo dejamos andando: vos solo mandás los archivos.",
      tick: "Sin escribir una línea de código",
    },
    // Micro-puente hacia la sección siguiente (Escenarios = situaciones, no rubros).
    bridge: "¿Te suena? Mirá estos casos",
  },

  // Cómo funciona, en 3 pasos de lenguaje cliente.
  steps: [
    {
      step: "1",
      title: "Subís tus documentos",
      description:
        "Manuales, políticas, listas de precios, reglamentos, preguntas frecuentes. Word, PDF o texto — los subís desde un panel simple y listo.",
      icon: "FileUp",
    },
    {
      step: "2",
      title: "Intellix responde con tus fuentes",
      description:
        "Cada respuesta sale de tus documentos y muestra de dónde salió. Si la respuesta no está en tu información, lo dice con honestidad — no inventa.",
      icon: "MessageCircle",
    },
    {
      step: "3",
      title: "Tu equipo entra cuando hace falta",
      description:
        "Si la consulta necesita una persona, Intellix se la pasa a tu equipo con toda la conversación y los datos del cliente. Nadie repite su problema dos veces.",
      icon: "Users",
    },
  ],

  // Escenarios: mini-historias donde el visitante se ve reflejado.
  scenarios: [
    {
      title: "La consulta de las 11 de la noche",
      story:
        "Tu cliente quiere saber un requisito, un precio o un horario — y son las 23:40. Antes, ese mensaje esperaba hasta mañana. Ahora tiene respuesta al segundo, con la información oficial de tu empresa.",
      example: {
        q: "¿Atienden los sábados?",
        a: "Sí, de 9 a 13 hs en la sucursal centro. ¿Querés que te agende con alguien del equipo para el sábado?",
        time: "23:41",
      },
      icon: "MoonStar",
      tag: "Para tus clientes",
    },
    {
      title: "Las mismas 20 preguntas de siempre",
      story:
        "Tu equipo pierde horas por día contestando lo mismo: cómo se hace tal trámite, qué documentación piden, cuánto demora. Intellix resuelve las repetidas y tu gente se dedica a los casos que de verdad la necesitan.",
      example: {
        q: "¿Qué necesito para hacer el reclamo?",
        a: "Solo tu número de cliente y una foto del comprobante. El reclamo se responde dentro de las 48 hs hábiles.",
        time: "10:12",
      },
      icon: "RotateCcw",
      tag: "Para tus clientes",
    },
    {
      title: "El manual que nadie lee",
      story:
        "Las políticas y procedimientos internos existen… en un PDF de 80 páginas que nadie abre. Con Intellix, tus empleados preguntan en su idioma y reciben la respuesta exacta, con cita al documento oficial.",
      example: {
        q: "¿Cuántos días de licencia me corresponden?",
        a: "Según el reglamento interno, te corresponden 14 días corridos a partir del primer año. Fuente: Reglamento de personal, sección 5.",
        time: "09:30",
      },
      icon: "BookOpen",
      tag: "Para tu equipo",
    },
    {
      title: "El empleado nuevo que pregunta sin vergüenza",
      story:
        "Los primeros meses, un ingresante interrumpe a sus compañeros diez veces por día — o peor, no pregunta. Con Intellix consulta todo lo que necesita, cuantas veces quiera, y aprende los procesos conversando.",
      example: {
        q: "¿Cómo cargo un pedido de un cliente nuevo?",
        a: "Primero se da de alta al cliente en el sistema con su CUIT. Te detallo los 4 pasos del proceso…",
        time: "11:47",
      },
      icon: "GraduationCap",
      tag: "Para tu equipo",
    },
  ],

  // Confianza: las objeciones típicas, respondidas con features reales.
  trust: {
    eyebrow: "¿Y si la IA inventa?",
    title: "Diseñado para no inventar",
    description:
      "La primera pregunta que nos hacen siempre es la misma: ¿cómo sé que no le va a decir cualquier cosa a mis clientes? Así lo resolvimos:",
    items: [
      {
        title: "Responde solo con tu información",
        description:
          "Intellix no saca respuestas de internet ni de su imaginación: usa únicamente los documentos que vos cargaste. Cada respuesta muestra la fuente para que cualquiera pueda verificarla.",
        icon: "FileCheck",
      },
      {
        title: "Si no sabe, lo dice",
        description:
          "Antes de responder, el sistema verifica que tu documentación realmente contenga la respuesta. Si no la tiene, lo admite y ofrece pasarte con una persona — nunca improvisa.",
        icon: "ShieldCheck",
      },
      {
        title: "Detecta contradicciones",
        description:
          "Si dos documentos tuyos dicen cosas distintas (una dirección vieja y una nueva, por ejemplo), Intellix lo detecta y te avisa para que lo resuelvas — en vez de responder al azar.",
        icon: "GitCompare",
      },
      {
        title: "Tus datos, solo tuyos",
        description:
          "Cada empresa tiene su espacio completamente aislado: tus documentos y conversaciones no se mezclan con los de nadie, no entrenan modelos de terceros, y tenés backup diario y exportación completa cuando quieras.",
        icon: "Lock",
      },
    ],
  },

  // Canales: dónde atiende.
  channels: {
    eyebrow: "Un asistente, todos tus canales",
    title: "En tu web y en tu WhatsApp",
    description:
      "El mismo asistente y el mismo equipo de operadores atienden los dos canales. Vos ves todo en un solo panel.",
    items: [
      {
        title: "Widget en tu sitio web",
        description:
          "Se instala pegando una línea de código — funciona en WordPress, Shopify o cualquier página. Con tu logo, tus colores y el nombre que quieras: tus clientes ven TU asistente, no el nuestro.",
        icon: "Globe",
      },
      {
        title: "WhatsApp Business oficial",
        description:
          "Conexión directa con la API oficial de Meta, sin intermediarios. Tus clientes escriben al número de siempre y los atiende el asistente — o tu equipo, desde el mismo lugar.",
        icon: "MessageSquare",
      },
    ],
  },

  // "Vos tenés el control" — los dos paneles reales del producto, contados como beneficio.
  control: {
    eyebrow: "Tu equipo al mando",
    title: "Vos tenés el control",
    description:
      "Intellix no reemplaza a tu equipo ni te deja atado a un proveedor: tu gente atiende desde una bandeja en vivo, y vos manejás documentos, marca y métricas desde un panel simple.",
    operator: {
      tag: "Para tu equipo de atención",
      title: "Una bandeja en vivo, sin perder ninguna conversación",
      bullets: [
        "Tu equipo ve las conversaciones en tiempo real y las toma cuando el asistente deriva.",
        "Recibe el historial completo y los datos del cliente: nadie repite su problema dos veces.",
        "Transfiere entre sectores, comparte archivos y devuelve la conversación al asistente cuando terminó.",
      ],
      // Datos del mockup de la bandeja.
      mockup: {
        header: "Bandeja · Atención",
        tabs: ["En espera (1)", "En atención (2)", "Activas"],
        toast: "Nueva derivación · Marina G.",
        conversations: [
          {
            name: "Marina G.",
            channel: "WhatsApp",
            topic: "Quiere cambiar su plan",
            meta: "esperando hace 40 seg",
            state: "waiting",
            action: "Tomar",
          },
          {
            name: "Carlos P.",
            channel: "Web",
            topic: "Estado de su reclamo",
            meta: "atendiendo: Sofía",
            state: "active",
            action: null,
          },
          {
            name: "Lucía M.",
            channel: "Web",
            topic: "Horarios de atención",
            meta: "resuelta por el asistente",
            state: "bot",
            action: null,
          },
        ],
      },
    },
    admin: {
      tag: "Para vos",
      title: "Tu asistente, administrado por vos",
      bullets: [
        "Subís y actualizás los documentos vos mismo — el asistente aprende al instante.",
        "Cambiás logo, colores y textos del widget con vista previa en vivo, sin tocar código.",
        "Ves cuánto resuelve el asistente solo, qué preguntan tus clientes y cuánto tarda tu equipo.",
      ],
      // Datos del mockup del panel.
      mockup: {
        header: "Panel de administración",
        stats: [
          { value: 82, suffix: "%", label: "resueltas por el asistente" },
          { value: 1.2, decimals: 1, suffix: "s", label: "tiempo de respuesta" },
        ],
        chartLabel: "Consultas por día",
        bars: [42, 65, 50, 78, 68, 90, 74],
        documents: [
          { name: "Manual de servicios.pdf", status: "done" },
          { name: "Preguntas frecuentes.docx", status: "done" },
          { name: "Lista de precios 2026.pdf", status: "processing" },
        ],
      },
    },
  },

  // Calculadora interactiva: consultas/mes → horas de equipo liberadas.
  calculator: {
    eyebrow: "Hacé la cuenta",
    title: "¿Cuánto tiempo le devuelve a tu equipo?",
    description:
      "Movete el control y mirá qué pasa con las consultas que hoy responde una persona.",
    sliderLabel: "Consultas que recibís por mes",
    resolveRate: 0.7, // estimación conservadora (el tenant real está en 100%)
    minutesPerQuery: 5,
    resultResolved: "consultas las resuelve Intellix solo",
    resultHours: "horas de tu equipo liberadas por mes",
    note: "Estimación conservadora: 70% de resolución automática y 5 minutos por consulta. Nuestro tenant en producción hoy resuelve el 100% solo.",
    cta: "Quiero estos números en mi empresa",
  },

  // Preguntas frecuentes — objeciones residuales, al final de la página.
  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Lo que todos preguntan",
    items: [
      {
        q: "¿Y si el asistente inventa una respuesta?",
        a: "No puede: responde únicamente con la información de tus documentos y cita la fuente en cada respuesta. Antes de responder, verifica que tu documentación realmente contenga la respuesta — si no la tiene, lo admite y ofrece derivar a tu equipo. Nunca improvisa.",
      },
      {
        q: "¿Mis datos están seguros? ¿Se usan para entrenar otras IA?",
        a: "Cada empresa tiene su instancia completamente aislada: tus documentos y conversaciones no se mezclan con los de nadie y no se usan para entrenar modelos de terceros. Además tenés backups automáticos diarios y podés exportar toda tu base cuando quieras.",
      },
      {
        q: "¿Qué tan difícil es implementarlo?",
        a: "Nada: nos compartís tus documentos y en 48 horas tenés tu asistente configurado con tu marca, listo para probar. El widget se instala pegando una línea de código — funciona en WordPress, Shopify o cualquier sitio. Sin proyectos de sistemas ni consultores.",
      },
      {
        q: "¿Atiende WhatsApp de verdad?",
        a: "Sí, con la API oficial de WhatsApp Business de Meta, sin intermediarios. El mismo asistente y los mismos operadores atienden tu web y tu WhatsApp, y vos ves todo en un solo panel.",
      },
      {
        q: "¿Qué pasa cuando hace falta una persona?",
        a: "El asistente deriva la conversación a tu equipo con todo el contexto: el historial completo y los datos del cliente. Tu operador retoma sin pedirle a nadie que repita su problema. Vos configurás cuándo y cómo se deriva.",
      },
      {
        q: "¿Puedo actualizar la información yo mismo?",
        a: "Sí: subís, editás o borrás documentos desde tu panel y el asistente aprende al instante. También cambiás colores, logo y textos del widget con vista previa en vivo, sin tocar código ni depender de nosotros.",
      },
    ],
  },

  // Planes — sin precios públicos: features reales del producto + CTA a consultar.
  pricing: {
    eyebrow: "Planes",
    title: "Un plan para cada etapa",
    description:
      "Todos incluyen tu instancia aislada, panel de administración y backups diarios. El precio se conversa según tu volumen — sin sorpresas.",
    plans: [
      {
        name: "Starter",
        tagline: "Para empezar a responder solo",
        features: [
          "Widget en tu sitio web con tu marca",
          "Documentos de hasta 10 MB cada uno",
          "Panel de administración completo",
          "Derivación a tu equipo con contexto",
          "Backups automáticos diarios",
        ],
        cta: "Consultar",
        whatsapp: "Hola! Quiero consultar por el plan Starter de Intellix.",
        featured: false,
      },
      {
        name: "Professional",
        tagline: "Para atender todos tus canales",
        badge: "Más elegido",
        features: [
          "Todo lo de Starter",
          "WhatsApp Business oficial (API de Meta)",
          "Documentos de hasta 50 MB cada uno",
          "Sectores y operadores ilimitados",
          "Métricas completas de atención",
          "Reglas de derivación configurables",
        ],
        cta: "Consultar",
        whatsapp: "Hola! Quiero consultar por el plan Professional de Intellix.",
        featured: true,
      },
      {
        name: "Enterprise",
        tagline: "Para operaciones exigentes",
        features: [
          "Todo lo de Professional",
          "Documentos de hasta 200 MB cada uno",
          "Conectores de solo lectura a tus sistemas",
          "Instancia dedicada con SLA",
          "Onboarding del equipo y soporte prioritario",
        ],
        cta: "Hablar con nosotros",
        whatsapp: "Hola! Quiero consultar por el plan Enterprise de Intellix.",
        featured: false,
      },
    ],
    note: "¿No sabés cuál te queda? Contanos tu caso y te lo decimos con honestidad.",
  },

  // Puesta en marcha.
  launch: {
    eyebrow: "Sin proyectos eternos",
    title: "Funcionando en 48 horas",
    description:
      "No hay implementación de meses ni consultores. Armamos una prueba con tu propia documentación para que lo veas funcionando con tus casos reales, sin compromiso.",
    steps: [
      "Nos compartís algunos documentos de tu empresa (manuales, FAQs, lo que tengas).",
      "En 48 hs te entregamos tu asistente configurado con tu marca, listo para probar.",
      "Lo probás con tu equipo, lo ajustamos juntos y decidís si seguimos.",
    ],
    cta: "Empezar mi prueba de 48 hs",
  },

  // Cierre.
  closing: {
    title: "¿Querés ver Intellix respondiendo con la información de tu empresa?",
    description:
      "Te armamos una prueba personalizada en 48 horas con tu propia documentación, sin compromiso.",
    primaryCta: "Quiero mi prueba de 48 hs",
    secondaryCta: "Hablar con nosotros",
  },

  // Versión corta (metadata / OG).
  short: {
    description:
      "Intellix convierte los documentos de tu empresa en un asistente que responde al instante en tu web y tu WhatsApp, y deriva a tu equipo cuando hace falta una persona.",
  },

  // Mensajes pre-cargados para los CTA por WhatsApp.
  whatsapp: {
    demo: "Hola! Quiero probar Intellix con los documentos de mi empresa.",
    specialist: "Hola! Quiero hacerles unas consultas sobre Intellix.",
  },

  // === FICHA TÉCNICA (/tecnologia) ===

  tech: {
    intro:
      "Para el visitante técnico: así está construido Intellix por dentro. Si venís del equipo de sistemas de tu empresa, esto es para vos.",
    features: [
      { text: "Respuestas con citas a los documentos fuente", icon: "Zap" },
      { text: "Widget embebible con una línea de script", icon: "Code2" },
      { text: "Multi-tenant real con aislamiento por schema", icon: "Building2" },
      { text: "White-label completo (logo, colores, nombre)", icon: "Palette" },
      { text: "Derivación a operadores con contexto completo", icon: "Users" },
      { text: "Panel admin para documentos, equipo y métricas", icon: "LayoutDashboard" },
      { text: "WhatsApp Business vía Meta Cloud API oficial", icon: "MessageCircle" },
      { text: "Detección de duplicados y contradicciones", icon: "SearchCheck" },
      { text: "Conectores de solo lectura a APIs del cliente", icon: "Cable" },
      { text: "Backups diarios automatizados + export completo", icon: "DatabaseBackup" },
      { text: "Auditoría inmutable de accesos y cambios", icon: "ScrollText" },
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
          "LLMs vía Groq (Llama 3.3 70B + Llama 4)",
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
      { value: "2", label: "canales: web + WhatsApp oficial" },
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
  },
} as const;
