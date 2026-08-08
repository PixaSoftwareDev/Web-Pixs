/**
 * Datos centrales de la marca. Editar acá y se actualiza en todo el sitio.
 * El sitio es 100% Intellix; Pixs queda solo como firma en el footer.
 */
export const site = {
  name: "Intellix",
  // Va en el título de la pestaña: corto (el navegador recorta); el SEO largo vive en description.
  tagline: "Chatbot IA",
  description:
    "Intellix convierte los documentos de tu empresa en un asistente que responde consultas de clientes y empleados al instante, 24/7 — y deriva a tu equipo cuando hace falta una persona.",
  url: "https://www.intellix.com.ar",
  // Casilla comercial de la marca (Ferozo). ventas@ y soporte@ existen pero no van en la web.
  email: "hola@intellix.com.ar",
  location: "Argentina",
  // Firma discreta en el footer.
  byline: "Un producto de Pixs",
  // Formato internacional sin '+', sin espacios. Argentina móvil = 549 + área + número.
  whatsapp: "5492477509003",
  logo: {
    // Wordmark letra blanca + isotipo color → fondo oscuro (tema dark).
    dark: "https://res.cloudinary.com/dukv3ov6t/image/upload/e_trim/c_lpad,w_1500,h_470,b_transparent/v1780009423/INTELLIX_BLACk_1_eka1bo.png",
    // Wordmark letra negra + isotipo color → fondo claro (tema light).
    light:
      "https://res.cloudinary.com/dukv3ov6t/image/upload/e_trim/c_lpad,w_1500,h_470,b_transparent/v1780009528/INTELLIX_WHITE_1_s9gvxw.png",
    // Isotipo hexagonal a color (degradé cyan→azul→violeta) — sirve en ambos temas.
    icon: "https://res.cloudinary.com/dukv3ov6t/image/upload/c_pad,w_400,h_400,b_transparent/v1780009417/IMG_0131_df525n.png",
    // Solo las letras "INTELLIX_" (recorte del wordmark oficial) — para el navbar.
    wordmark: {
      dark: "https://res.cloudinary.com/dukv3ov6t/image/upload/e_trim/c_lpad,w_1500,h_470,b_transparent/c_crop,w_1500,h_152,g_south/e_trim/v1780009423/INTELLIX_BLACk_1_eka1bo.png",
      light:
        "https://res.cloudinary.com/dukv3ov6t/image/upload/e_trim/c_lpad,w_1500,h_470,b_transparent/c_crop,w_1500,h_152,g_south/e_trim/v1780009528/INTELLIX_WHITE_1_s9gvxw.png",
    },
  },
  socials: {
    linkedin: "https://www.linkedin.com/company/pixstech/",
    github: "https://github.com/pixs",
  },
  /**
   * La app del producto (login, paneles, API y widget). Vive en su propio
   * subdominio: el dominio raíz queda para esta landing.
   *
   * Antes esto apuntaba a `www.intellix.com.ar`, que es donde la app vivía
   * históricamente. Ese host va a pasar a servir la landing, así que apuntar
   * acá es lo único que sobrevive a la mudanza. Ver docs/INFRAESTRUCTURA.md.
   */
  app: {
    url: "https://app.intellix.com.ar",
    login: "https://app.intellix.com.ar/login",
  },
} as const;

/** Construye un link a wa.me con un mensaje opcional pre-cargado. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
