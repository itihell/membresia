export const revalidate = 0;

import { Suspense } from "react";
import Link from "next/link";
import { FaPencil, FaArrowLeft } from "react-icons/fa6"; // Cambié FaPeopleGroup por FaArrowLeft para "Volver"
import { Loading } from "@/components";
import { BodyPage } from "@/modules/common/components"; // Ajusta tus imports
import { ContainerPersona } from "../ui/ContainerPersona";
import { Button } from "@/components/ui/button"; // Asumiendo Shadcn Button

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const ShowPersonaPage = async (props: Props) => {
  const params = await props.params;
  const { id } = params;

  return (
    <BodyPage
      title="Perfil del Miembro"
      subtitle="Visualiza y gestiona la información detallada."
      headerAction={
        // BARA DE ACCIONES SUPERIOR (Responsive)
        <div className="flex items-center gap-2">
          {/* Botón Volver: Estilo "Ghost" o secundario */}
          <Link href={`/personas`}>
            <Button
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-900"
            >
              <FaArrowLeft className="mr-0 sm:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Volver a Lista</span>
            </Button>
          </Link>

          {/* Botón Editar: Estilo Primario (Azul Marino) */}
          <Link href={`/personas/edit/${id}`}>
            <Button className="bg-blue-950 hover:bg-blue-900 text-white shadow-sm">
              <FaPencil className="mr-0 sm:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Editar Datos</span>
            </Button>
          </Link>
        </div>
      }
    >
      {/* CONTENIDO LIMPIO */}
      {/* Eliminamos los bordes extra, dejamos que BodyPage maneje el contenedor */}
      <Suspense fallback={<Loading />}>
        <ContainerPersona id={id} />
      </Suspense>
    </BodyPage>
  );
};

export default ShowPersonaPage;
