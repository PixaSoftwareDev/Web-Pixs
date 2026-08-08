/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /*
   * Export estático: `next build` escribe HTML plano en `out/` y nginx lo sirve
   * como archivos, sin proceso Node de por medio.
   *
   * El sitio ya era 100% estático (todas las rutas se pre-renderizaban), así que
   * no se pierde nada. A cambio, la landing no puede "caerse": no hay servidor
   * que crashee ni contenedor que no levante.
   *
   * Vive en el mismo dominio que el webhook de WhatsApp y los widgets de
   * clientes, que están fijados en sistemas de terceros y no se pueden mover.
   * Ver docs/INFRAESTRUCTURA.md.
   */
  output: "export",

  images: {
    /*
     * El optimizador de next/image necesita un servidor, que acá no hay. No es
     * pérdida: todas las imágenes vienen de Cloudinary, que ya entrega AVIF/WebP
     * según el Accept del navegador y recorta por URL. next/image sigue dando
     * lazy loading y reserva de espacio (sin saltos de layout).
     */
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
