"use client";
import { updateAsistencia } from "@/actions";
import type {
  countAsistencia,
  Evento,
  EventoHasAsistencia,
} from "@/interfaces";
import { cn } from "@/lib/utils";
import { useQueryAsistencia } from "@/modules/eventos/hooks";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  FaCheck,
  FaCirclePlus,
  FaListCheck,
  FaPerson,
  FaPersonDress,
  FaPersonHalfDress,
  FaXmark,
  FaMagnifyingGlass,
  FaUser,
} from "react-icons/fa6";
import { BuscarVisitanteDialog } from "../asistencias/BuscarVisitanteDialog";

interface Prop {
  eventoId: string;
}

export function GridAsistencia({ eventoId }: Prop) {
  const { data, isPending, refetch } = useQueryAsistencia(eventoId);
  const [openBuscar, setOpenBuscar] = useState(false);

  const asistencias = data?.eventos_has_asistencia;
  const evento = data ? { ...data } : ({} as Evento); // Asegúrate de que 'evento' siempre sea un objeto Evento o similar

  const router = useRouter();

  const groupAsistenciaBySex = (events: EventoHasAsistencia[]) => {
    return events.reduce(
      (acc, row) => {
        // Si la persona asistió, hacemos los incrementos
        if (row.asistio) {
          acc.total += 1; // Sumamos 1 al total general

          if (row.visitante) {
            acc.visitantes += 1;
          }

          if (row.persona?.sexo_id === 1) {
            acc.hombres += 1;
          } else if (row.persona?.sexo_id === 2) {
            acc.mujeres += 1;
          }
        }

        return acc;
      },
      { hombres: 0, mujeres: 0, total: 0, visitantes: 0 } as countAsistencia
    );
  };

  const count = useMemo<countAsistencia>(() => {
    if (asistencias && asistencias.length > 0) {
      return groupAsistenciaBySex(asistencias as EventoHasAsistencia[]);
    }
    return { hombres: 0, mujeres: 0, total: 0, visitantes: 0 };
  }, [asistencias]);

  // useEffect(() => {
  //   if (asistencias && asistencias.length > 0) {
  //     const cantidad = groupAsistenciaBySex(
  //       asistencias as EventoHasAsistencia[]
  //     );
  //     setCount(cantidad);
  //   } else if (asistencias && asistencias.length === 0) {
  //     setCount({ hombres: 0, mujeres: 0, total: 0 });
  //   }
  // }, [asistencias]);

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
      <div className="fixed right-8 bottom-8 flex gap-2">
        <button
          type="button"
          className="flex gap-1 items-center rounded-sm border border-red-400 bg-linear-to-t from-red-600 to-red-500 hover:bg-linear-to-b text-white p-3 shadow-xs shadow-red-800"
          onClick={() => router.back()}
        >
          <FaListCheck size={20} />
          <span className="md:block hidden"> Regresar</span>
        </button>
        <button
          type="button"
          className="flex gap-1 items-center rounded-sm border border-blue-400 bg-linear-to-t from-blue-600 to-blue-500 hover:bg-linear-to-b text-white p-3 shadow-xs shadow-blue-800"
          onClick={() => setOpenBuscar(true)}
        >
          <FaMagnifyingGlass size={18} />
          <span className="md:block hidden"> Buscar Visitante</span>
        </button>
        <button
          type="button"
          className="flex gap-1 items-center rounded-sm border border-green-400 bg-linear-to-t from-green-600 to-green-500 hover:bg-linear-to-br text-white p-3 shadow-xs shadow-green-800"
          onClick={() => router.push(`/eventos/${eventoId}/agregar-persona`)}
        >
          <FaCirclePlus size={20} />
          <span className="md:block hidden"> Agregar Nuevo</span>
        </button>
      </div>

      <div className="flex justify-between bg-linear-to-t from-blue-500 to-blue-700 py-2 rounded-t-lg text-white">
        <div className="px-5 text-white rounded-t-lg">
          {`${evento.date && format(new Date(evento.date), "dd/MM/yyyy")} | ${
            evento.title
          }`}
        </div>
      </div>
      <div className="grid grid-cols-7 bg-linear-to-t bg-blue-500 py-2 text-white border-b border-white">
        <div className="px-5 col-span-7 flex gap-2">
          <strong>Descripción: </strong>
          <span>{evento.description}</span>
        </div>
      </div>
      <div className="grid grid-cols-7 place-content-between bg-linear-to-t bg-blue-500 py-2 text-white">
        <div className="px-3 flex gap-1 col-span-1">
          <FaPersonHalfDress size={22} />
          <span className="">{count.total}</span>
        </div>
        <div className="px-3 flex gap-1 col-span-1">
          <FaPerson size={22} />
          <span className="">{count.hombres}</span>
        </div>
        <div className="px-3 flex gap-1 col-span-1">
          <FaPersonDress size={22} />
          <span className=" ">{count.mujeres}</span>
        </div>
        <div className="px-3 flex gap-1 col-span-1">
          <FaUser size={22} />
          <span className=" ">{count.visitantes}</span>
        </div>
      </div>
      <div className="px-5 grid grid-cols-7 py-2 bg-blue-500 gap-2 text-white">
        <div>No.</div>
        <div className="col-span-5">Persona</div>
        <div className="text-center">Asistió</div>
      </div>
      <div className="pb-24">
        {asistencias?.map((asistencia: any, index) => (
          <div
            key={asistencia.id}
            className="px-5 grid grid-cols-7 gap-2 border-b border-blue-300 py-2 hover:bg-blue-100 hover:cursor-pointer items-center"
          >
            <div className="col-span-1">{index + 1}</div>
            <div
              className="col-span-5 flex items-center gap-2"
              onClick={() => hundleToPersona(asistencia.people_id as string)}
            >
              <span>{`${asistencia?.persona?.nombres} ${asistencia.persona?.apellidos}`}</span>
              {asistencia.visitante && (
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-medium border border-yellow-200">
                  Visitante
                </span>
              )}
            </div>
            <div className="col-span-1 text-center flex justify-center">
              <button
                type="button"
                className={cn(
                  "bg-red-500 text-white p-1.5 rounded-sm flex items-center justify-center w-8 h-8",
                  {
                    "bg-green-500": asistencia.asistio,
                  }
                )}
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

      <BuscarVisitanteDialog
        open={openBuscar}
        onOpenChange={setOpenBuscar}
        eventoId={eventoId}
        onPersonaAgregada={() => refetch()}
      />
    </div>
  );
}
