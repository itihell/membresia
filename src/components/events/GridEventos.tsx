"use client";

import { getEventos, deleteEvent } from "@/actions";
import type { ListaEventos } from "@/interfaces";
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

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (
      confirm("¿Estás seguro de eliminar este evento y toda su asistencia?")
    ) {
      try {
        await deleteEvent(id);
        setEventos(eventos.filter(ev => ev.id !== id));
      } catch (error) {
        console.error(error);
        alert("Error al eliminar el evento");
      }
    }
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-1 bg-blue-700 text-white p-2 ">
        <div>Fecha</div>
        <div>Título</div>
        <div>Asistencia</div>
        <div className="text-center">Acciones</div>
      </div>
      <div className="p-2">
        <Suspense fallback={<Loading />}>
          {eventos.map(evento => {
            return (
              <div
                onClick={() => hundlerSelectedClick(evento.id as string)}
                className="grid grid-cols-4 gap-1 py-2 hover:bg-blue-300 hover:cursor-pointer border-b border-blue-500 items-center"
                key={evento.id}
              >
                <div className="">{format(evento.date, "dd/MM/yyyy")}</div>
                <div>{evento.title}</div>
                <div>{evento.asistencia}</div>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      router.push(`/eventos/edit/${evento.id}`);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={e => handleDelete(e, evento.id as string)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </Suspense>
      </div>
    </div>
  );
}
