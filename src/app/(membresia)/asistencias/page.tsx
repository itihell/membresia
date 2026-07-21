import { AsistenciasGrid } from "@/components";
import { BodyPage } from "@/modules/common/components";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AsistenciasPage() {
  return (
    <BodyPage
      title="Asistencias"
      subtitle="Listado de eventos — selecciona uno para pasar asistencia"
    >
      <AsistenciasGrid />
    </BodyPage>
  );
}
