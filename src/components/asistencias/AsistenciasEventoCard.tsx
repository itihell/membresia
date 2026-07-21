"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  FaCalendarDays,
  FaChurch,
  FaUsers,
  FaUserCheck,
} from "react-icons/fa6";

interface EventoCardProps {
  id: string;
  title: string;
  description?: string | null;
  date: Date | string;
  tipoEvento?: string | null;
  asistieron: number;
  totalEnEvento: number;
  porcentaje: number;
  onClick: () => void;
}

export function AsistenciasEventoCard({
  title,
  description,
  date,
  tipoEvento,
  asistieron,
  totalEnEvento,
  porcentaje,
  onClick,
}: EventoCardProps) {
  const porcentajeColor =
    porcentaje >= 75
      ? "bg-green-500"
      : porcentaje >= 50
        ? "bg-blue-500"
        : porcentaje >= 25
          ? "bg-yellow-500"
          : "bg-red-400";

  const badgeColor =
    porcentaje >= 75
      ? "bg-green-100 text-green-800"
      : porcentaje >= 50
        ? "bg-blue-100 text-blue-800"
        : porcentaje >= 25
          ? "bg-yellow-100 text-yellow-800"
          : "bg-red-100 text-red-800";

  return (
    <div
      onClick={onClick}
      className="group relative bg-white border border-blue-100 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer overflow-hidden"
    >
      {/* Borde izquierdo decorativo */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-blue-400 rounded-l-xl" />

      <div className="p-5 pl-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-blue-950 text-base leading-tight truncate group-hover:text-blue-700 transition-colors">
              {title}
            </h3>
            {description && (
              <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                {description}
              </p>
            )}
          </div>
          <span
            className={`shrink-0 text-xs font-bold px-2 py-1 rounded-full ${badgeColor}`}
          >
            {porcentaje}%
          </span>
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <FaCalendarDays className="text-blue-500" />
            <span>
              {format(new Date(date), "dd 'de' MMMM, yyyy", { locale: es })}
            </span>
          </div>
          {tipoEvento && (
            <div className="flex items-center gap-1">
              <FaChurch className="text-blue-500" />
              <span>{tipoEvento}</span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-green-700">
              <FaUserCheck size={14} />
              <span className="font-medium">{asistieron}</span>
              <span className="text-gray-400">asistieron</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <FaUsers size={14} />
              <span className="font-medium">{totalEnEvento}</span>
              <span className="text-gray-400">registrados</span>
            </div>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${porcentajeColor}`}
            style={{ width: `${porcentaje}%` }}
          />
        </div>
      </div>

      {/* Hover CTA */}
      <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/[0.02] transition-colors rounded-xl" />
    </div>
  );
}
