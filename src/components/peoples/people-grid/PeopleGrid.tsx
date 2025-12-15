"use client";

import type { People } from "@/interfaces";
import { PeopleGridItem } from "./PeopleGridItem";
import { useQueryPeoples } from "@/modules/peoples/hooks";

export const PeopleGrid = () => {
  const { data, isPending } = useQueryPeoples();
  const peoples: People[] = data?.peoples || [];

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-64 w-full">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-950"></div>
      </div>
    );
  }

  if (peoples.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-blue-900/60 border border-dashed border-blue-200 rounded-xl bg-blue-50/30">
        <p>No se encontraron miembros registrados.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="min-w-full text-sm">
        {/* ENCABEZADO */}
        <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-blue-100 bg-blue-50/50 text-xs font-semibold uppercase tracking-wider text-blue-950 rounded-t-lg">
          {/* Índice: siempre 1 columna */}
          <div className="col-span-1 text-center text-blue-400">#</div>

          {/* Nombre: 
              - Móvil: Ocupa 11 columnas (casi todo).
              - Desktop (md): Ocupa 8 columnas. 
          */}
          <div className="col-span-11 md:col-span-8">Miembro</div>

          {/* Teléfono:
              - Móvil: hidden (Oculto).
              - Desktop (md): block (Visible) y ocupa 3 columnas.
          */}
          <div className="hidden md:block md:col-span-3">Teléfono</div>
        </div>

        {/* CUERPO */}
        <div className="bg-white divide-y divide-blue-50 border-x border-b border-blue-100 rounded-b-lg">
          {peoples.map((people, index) => (
            <PeopleGridItem index={index} key={people.id} people={people} />
          ))}
        </div>
      </div>
    </div>
  );
};
