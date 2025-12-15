"use client";

import type { People } from "@/interfaces";
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa6";

interface Props {
  people: People;
  index: number;
}

export const PeopleGridItem = ({ people, index }: Props) => {
  const router = useRouter();

  const onSelectedPeople = (id: string) => {
    router.push(`/personas/${id}`);
  };

  const isMember = people.membresia && people.membresia.length > 0;

  return (
    <div
      onClick={() => onSelectedPeople(people.id as string)}
      role="button"
      tabIndex={0}
      className="grid grid-cols-12 gap-4 px-4 py-3 items-center transition-colors hover:bg-blue-50 cursor-pointer group"
    >
      {/* 1. ÍNDICE */}
      <div className="col-span-1 text-center text-blue-300 font-medium text-xs">
        {index + 1}
      </div>

      {/* 2. NOMBRE COMPLETO + TELÉFONO (Móvil) 
          - col-span-11: En móvil toma todo el espacio restante.
          - md:col-span-8: En escritorio se reduce.
      */}
      <div className="col-span-11 md:col-span-8 flex flex-col justify-center">
        {/* Fila Superior: Nombre + Badge */}
        <div className="flex items-center gap-2">
          {/* truncate: Corta el texto con '...' si es muy largo en una sola línea */}
          <span className="text-blue-950 font-medium text-sm truncate group-hover:text-blue-700 transition-colors">
            {people.nombres} {people.apellidos}
          </span>

          {isMember && (
            <span className="inline-flex items-center justify-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 h-5 w-5 shrink-0">
              <FaCheck size={10} />
            </span>
          )}
        </div>

        {/* Fila Inferior: Teléfono (SOLO VISIBLE EN MÓVIL) 
            - block: Visible por defecto (móvil).
            - md:hidden: Se oculta en pantallas medianas y grandes.
        */}
        <div className="block md:hidden mt-0.5">
          <span className="text-xs text-slate-400 font-mono">
            {people.telefono || "Sin teléfono"}
          </span>
        </div>
      </div>

      {/* 3. TELÉFONO (Escritorio) 
          - hidden: Oculto por defecto (móvil).
          - md:block: Visible en escritorio.
      */}
      <div className="hidden md:block md:col-span-3 text-slate-500 text-sm font-mono">
        {people.telefono || <span className="text-slate-300">-</span>}
      </div>
    </div>
  );
};
