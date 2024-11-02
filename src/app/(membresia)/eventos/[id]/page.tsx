import { GridAsistencia, Loading, Title } from "@/components";
import React, { Suspense } from "react";

interface Props {
  params: {
    id: string;
  };
}

export default function ShowAsistenciaPage({ params: { id } }: Props) {
  return (
    <div className="mb-5">
      <Title title="Asistencia del Evento" className="mb-2" />
      <div>
        <div className="bg-gray-50 border border-blue-200 rounded-t-lg">
          <Suspense fallback={<Loading />}>
            <GridAsistencia eventoId={id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
