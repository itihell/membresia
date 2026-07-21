"use client";

import { useState } from "react";
import { useQueryEventosAsistencia } from "@/modules/eventos/hooks";
import { AsistenciasEventoCard } from "./AsistenciasEventoCard";
import { AsistenciasSheet } from "./AsistenciasSheet";
import { FaCalendarXmark } from "react-icons/fa6";

export function AsistenciasGrid() {
  const { data: eventos, isPending, isError } = useQueryEventosAsistencia();
  const [selectedEventoId, setSelectedEventoId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleCardClick = (id: string) => {
    setSelectedEventoId(id);
    setSheetOpen(true);
  };

  if (isPending) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-xl p-5 animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
            <div className="h-3 bg-gray-100 rounded w-1/2 mb-4" />
            <div className="h-3 bg-gray-200 rounded w-full mb-2" />
            <div className="h-2 bg-gray-100 rounded w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-red-500 gap-2">
        <FaCalendarXmark size={40} className="opacity-60" />
        <p className="font-medium">Error al cargar los eventos</p>
        <p className="text-sm text-gray-500">
          Por favor, recarga la página o contacta al administrador.
        </p>
      </div>
    );
  }

  if (!eventos || eventos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
        <FaCalendarXmark size={48} className="opacity-30" />
        <p className="font-semibold text-lg">No hay eventos registrados</p>
        <p className="text-sm text-center max-w-xs">
          Crea un evento desde la sección de Eventos para comenzar a pasar
          asistencia.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Resumen total */}
      <div className="mb-5 flex flex-wrap gap-3">
        <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-2 text-sm">
          <span className="text-blue-600 font-semibold">{eventos.length}</span>
          <span className="text-gray-500 ml-1">eventos totales</span>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-lg px-4 py-2 text-sm">
          <span className="text-green-600 font-semibold">
            {eventos.filter(e => e.porcentaje >= 50).length}
          </span>
          <span className="text-gray-500 ml-1">con +50% asistencia</span>
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 text-sm">
          <span className="text-gray-600 font-semibold">
            {eventos[0]?.totalMiembros ?? 0}
          </span>
          <span className="text-gray-500 ml-1">miembros activos</span>
        </div>
      </div>

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {eventos.map(evento => (
          <AsistenciasEventoCard
            key={evento.id}
            id={evento.id}
            title={evento.title}
            description={evento.description}
            date={evento.date}
            tipoEvento={evento.tipos_evento?.name}
            asistieron={evento.asistieron}
            totalEnEvento={evento.totalEnEvento}
            porcentaje={evento.porcentaje}
            onClick={() => handleCardClick(evento.id)}
          />
        ))}
      </div>

      {/* Panel lateral de asistencia */}
      <AsistenciasSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        eventoId={selectedEventoId}
      />
    </>
  );
}
