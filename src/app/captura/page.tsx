import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Captura — no indexar",
  robots: { index: false, follow: false },
};

/*
 * Página oculta para grabar material del widget REAL en producción.
 * Simula el sitio de una empresa cliente (contenido creíble, no esqueletos)
 * con el widget de Intellix cargado. No está linkeada desde ningún lado.
 */
export default function CapturaPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-zinc-800">
      {/* Navbar de la empresa ficticia */}
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="font-display text-lg font-bold tracking-tight text-zinc-900">
            Servicios del Sur
          </span>
          <nav className="flex items-center gap-6 text-sm text-zinc-500">
            <span>Servicios</span>
            <span>Planes</span>
            <span>Sucursales</span>
            <span className="rounded-full bg-zinc-900 px-4 py-2 text-white">Contacto</span>
          </nav>
        </div>
      </header>

      {/* Hero de la empresa ficticia */}
      <section className="mx-auto max-w-5xl px-6 pb-10 pt-14">
        <p className="text-sm font-medium text-emerald-600">Atención al cliente</p>
        <h1 className="mt-2 max-w-xl font-display text-4xl font-bold leading-tight text-zinc-900">
          Estamos para ayudarte, todos los días
        </h1>
        <p className="mt-4 max-w-lg text-zinc-500">
          Gestioná tus trámites, consultá tu plan y resolvé tus dudas sin moverte
          de tu casa.
        </p>
        <div className="mt-6 flex gap-3">
          <span className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white">
            Hacer un trámite
          </span>
          <span className="rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-700">
            Ver mi plan
          </span>
        </div>
      </section>

      {/* Tarjetas de servicios */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid grid-cols-3 gap-4">
          {[
            { t: "Cambios de plan", d: "Actualizá tu plan sin costo, aplica el mes siguiente." },
            { t: "Reclamos", d: "Cargá tu comprobante y respondemos en 48 hs hábiles." },
            { t: "Sucursales y horarios", d: "Lunes a viernes de 8 a 18, sábados de 9 a 13." },
          ].map((c) => (
            <div key={c.t} className="rounded-xl border border-zinc-200 p-5">
              <div className="h-8 w-8 rounded-lg bg-emerald-100" />
              <p className="mt-3 font-semibold text-zinc-900">{c.t}</p>
              <p className="mt-1 text-sm text-zinc-500">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Widget real de Intellix (producción) — solo en esta página */}
      <Script
        src="https://dev.intellix.com.ar/widget/widget.js"
        strategy="afterInteractive"
        data-api-url="https://dev.intellix.com.ar"
        data-token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiJpbnRlbGxpeCIsInNjb3BlIjoid2lkZ2V0IiwiaWF0IjoxNzg0OTg5NDkzLCJleHAiOjE3OTI3NjU0OTN9.gmiL9vNgeKOfXpfih1VIlnX_kcgWna1lK4v459lUd5s"
        data-title="Intellix"
        data-placeholder="Hacé tu consulta..."
      />
    </main>
  );
}
