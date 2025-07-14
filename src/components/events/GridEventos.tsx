"use client";

import { getEventos } from "@/actions";
import { ListaEventos } from "@/interfaces";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Loading } from "../ui/loading/loading";

export function GridEventos() {
  const router = useRouter();

  const [eventos, setEventos] = useState([] as ListaEventos[]);
  useEffect(() => {
    (async () => {
      const rows = await getEventos();
      setEventos(rows);
    })();
  }, []);

  const hundlerSelectedClick = (id: string) => {
    router.push(`/eventos/${id}`);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-1 bg-blue-700 text-white p-2 ">
        <div>Fecha</div>
        <div>Título</div>
        <div>Asitencia</div>
      </div>
      <div className="p-2">
        <Suspense fallback={<Loading />}>
          {eventos.map((evento) => {
            return (
              <div
                onClick={() => hundlerSelectedClick(evento.id as string)}
                className="grid grid-cols-3 gap-1 py-2 hover:bg-blue-300 hover:cursor-pointer border-b border-blue-500"
                key={evento.id}
              >
                <div className="">{format(evento.date, "dd/MM/yyyy")}</div>
                <div>{evento.title}</div>
                <div>{evento.asistencia}</div>
              </div>
            );
          })}
        </Suspense>
      </div>
    </div>
  );
}
