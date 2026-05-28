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
  // Formato internacional sin '+', sin espacios. Argentina móvil = 549 + área + número.
  whatsapp: "5492477509003",
  logo: {
    // Logo blanco — para fondo oscuro (tema dark).
    // Transformaciones Cloudinary: recorta whitespace (e_trim) y normaliza a canvas
    // cuadrado 512x512 transparente (c_lpad) para que ambos logos midan igual.
    dark: "https://res.cloudinary.com/dukv3ov6t/image/upload/e_trim/c_lpad,w_512,h_512,b_transparent/v1778943933/Log_Sin_Fondo_wqravr.png",
    // Logo negro — para fondo claro (tema light). Mismas transformaciones.
    light:
      "https://res.cloudinary.com/dukv3ov6t/image/upload/e_trim/c_lpad,w_512,h_512,b_transparent/v1778945740/WhatsApp_Image_2026-05-05_at_22.55.33_1_gyeiul.png",
    // Isotipo "P" a color (gradiente azul/violeta con </>) — sirve en ambos temas.
    // También se usa como favicon vía src/app/icon.png.
    icon: "https://res.cloudinary.com/dukv3ov6t/image/upload/e_trim/c_pad,w_256,h_256,b_transparent/v1780008842/WhatsApp_Image_2026-05-05_at_20.17.36_2_ntlyrg.png",
  },
  socials: {
    linkedin: "https://www.linkedin.com/company/pixstech/",
    github: "https://github.com/pixs",
  },
} as const;

/** Construye un link a wa.me con un mensaje opcional pre-cargado. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
