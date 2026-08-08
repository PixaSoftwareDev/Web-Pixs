/**
 * Contenido editable del sitio. Cambiá acá los textos, no en los componentes.
 */

export const team = [
  {
    name: "Enzo Batistelli",
    role: "Co-founder · Comercial",
    image:
      "https://res.cloudinary.com/dukv3ov6t/image/upload/v1778943815/WhatsApp_Image_2026-05-12_at_17.28.59_uka6bf.png",
    // Retrato con fondo recortado (generado con hyperframes remove-background).
    cutout: "/media/team/enzo.png",
    accent: "blue",
  },
  {
    name: "Guillermo Fernandez",
    role: "Co-founder · Producto",
    image:
      "https://res.cloudinary.com/dukv3ov6t/image/upload/v1778945805/WhatsApp_Image_2026-05-16_at_12.32.20_p0rhft.png",
    cutout: "/media/team/guillermo.png",
    accent: "violet",
  },
  {
    name: "Alejo Maros",
    role: "Co-founder · Tecnología",
    image:
      "https://res.cloudinary.com/dukv3ov6t/image/upload/v1778943927/alejoperfil_mbqj1a.png",
    cutout: "/media/team/alejo.png",
    accent: "cyan",
  },
] as const;
