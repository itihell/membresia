"use client";
import { updateAsistencia } from "@/actions";
import { countAsistencia, Evento, EventoHasAsistencia } from "@/interfaces";
import { cn } from "@/lib/utils";
import { useQueryAsistencia } from "@/modules/eventos/hooks";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaCheck,
  FaCirclePlus,
  FaListCheck,
  FaPerson,
  FaPersonDress,
  FaPersonHalfDress,
  FaXmark,
} from "react-icons/fa6";

interface Prop {
  eventoId: string;
}

export function GridAsistencia({ eventoId }: Prop) {
  const { data, isPending, refetch } = useQueryAsistencia(eventoId);

  const asistencias = data?.eventos_has_asistencia;
  const evento = data ? { ...data } : ({} as Evento); // Asegúrate de que 'evento' siempre sea un objeto Evento o similar

  const router = useRouter();

  const [count, setCount] = useState<countAsistencia>({
    hombres: 0,
    mujeres: 0,
    total: 0,
  });

  const groupAsistenciaBySex = (events: EventoHasAsistencia[]) => {
    return events.reduce(
      (acc, row) => {
        if (row.persona?.sexo_id === 1 && row.asistio) {
          acc.hombres += 1;
        }
        if (row.persona?.sexo_id === 2 && row.asistio) {
          acc.mujeres += 1;
        }

        return acc;
      },
      { hombres: 0, mujeres: 0, total: 0 } as countAsistencia
    );
  };

  useEffect(() => {
    if (asistencias && asistencias.length > 0) {
      const cantidad = groupAsistenciaBySex(
        asistencias as EventoHasAsistencia[]
      );
      setCount(cantidad);
    } else if (asistencias && asistencias.length === 0) {
      setCount({ hombres: 0, mujeres: 0, total: 0 });
    }
  }, [asistencias]);

  const hundlerAsistio = async (id: string, status: boolean) => {
    await updateAsistencia(id, status);
    await refetch();
  };

  const hundleToPersona = (id: string) => {
    router.push(`/personas/${id}`);
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        Cargando asistencia...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error al cargar los datos del evento o no se encontraron.
      </div>
    );
  }

  return (
    <div>
      <div className="fixed right-8 bottom-8 flex">
        <button
          type="button"
          className="flex gap-1 items-center rounded-l-sm border border-red-400 bg-gradient-to-t from-red-600 to-red-500 hover:bg-gradient-to-b text-white p-3 shadow-sm shadow-red-800 "
          onClick={() => router.back()}
        >
          <FaListCheck size={20} />
          <span className="md:block hidden"> Regresar</span>
        </button>
        <button
          type="button"
          className="flex gap-1 items-center rounded-r-sm border border-green-400 bg-gradient-to-t from-green-600 to-green-500 hover:bg-gradient-to-br text-white p-3 shadow-sm shadow-red-800 "
          onClick={() => router.push(`/eventos/${eventoId}/agregar-asistencia`)}
        >
          <FaCirclePlus size={20} />
          <span className="md:block hidden"> Agregar</span>
        </button>
      </div>

      <div className="flex justify-between bg-gradient-to-t from-blue-500 to-blue-700 py-2 rounded-t-lg text-white">
        <div className="px-5 text-white rounded-t-lg">
          {`${evento.date && format(new Date(evento.date), "dd/MM/yyyy")} | ${
            evento.title
          }`}
        </div>
      </div>
      <div className="grid grid-cols-7 bg-gradient-to-t bg-blue-500 py-2 text-white border-b border-white">
        <div className="px-5 col-span-7 flex gap-2">
          <strong>Descripción: </strong>
          <span>{evento.description}</span>
        </div>
      </div>
      <div className="grid grid-cols-7 place-content-between bg-gradient-to-t bg-blue-500 py-2 text-white">
        <div className="px-5 flex gap-2 col-span-2 ">
          <FaPersonHalfDress size={22} />
          <span className="">{count.total}</span>
        </div>
        <div className="px-5 flex gap-2 col-span-2">
          <FaPerson size={22} />
          <span className="">{count.hombres}</span>
        </div>
        <div className="px-5 flex gap-2 col-span-2">
          <FaPersonDress size={22} />
          <span className=" ">{count.mujeres}</span>
        </div>
      </div>
      <div className="px-5 grid grid-cols-7 py-2 bg-blue-500 gap-2 text-white">
        <div>No.</div>
        <div className="col-span-5">Persona</div>
        <div className="text-center">Asistio</div>
      </div>
      <div>
        {asistencias?.map((asistencia, index) => (
          <div
            key={asistencia.id}
            className="px-5 grid grid-cols-7 gap-2 border-b border-blue-300 py-2 hover:bg-blue-100 hover:cursor-pointer"
          >
            <div className="col-span-1">{index + 1}</div>
            <div
              className="col-span-5"
              onClick={() => hundleToPersona(asistencia.people_id as string)}
            >{`${asistencia?.persona?.nombres} ${asistencia.persona?.apellidos}`}</div>
            <div className="col-span-1 text-center ">
              <button
                type="button"
                className={cn("bg-red-500 text-white p-1 rounded-sm", {
                  "bg-green-500": asistencia.asistio,
                })}
                onClick={() =>
                  hundlerAsistio(asistencia.id as string, asistencia.asistio)
                }
              >
                {asistencia.asistio ? <FaCheck /> : <FaXmark />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
