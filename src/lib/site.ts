/**
 * Datos centrales de la marca. Editar acá y se actualiza en todo el sitio.
 */
export const site = {
  name: "Pixs",
  tagline: "Construimos el software que tu negocio necesita",
  description:
    "Pixs es un estudio de desarrollo de software. Diseñamos y construimos web apps, mobile apps, MVPs e integraciones a medida.",
  url: "https://pixs.dev",
  email: "hola@pixs.dev",
  location: "Argentina",
  logo: {
    // Logo blanco — para fondo oscuro (tema dark)
    dark: "https://res.cloudinary.com/dukv3ov6t/image/upload/v1778943933/Log_Sin_Fondo_wqravr.png",
    // Logo negro — para fondo claro (tema light)
    light:
      "https://res.cloudinary.com/dukv3ov6t/image/upload/v1778945740/WhatsApp_Image_2026-05-05_at_22.55.33_1_gyeiul.png",
  },
  socials: {
    linkedin: "https://linkedin.com/company/pixs",
    instagram: "https://instagram.com/pixs",
    github: "https://github.com/pixs",
  },
} as const;
