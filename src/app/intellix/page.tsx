import { redirect } from "next/navigation";

/** La home ahora ES la landing de Intellix — esta ruta queda por compatibilidad. */
export default function IntellixRedirect() {
  redirect("/");
}
