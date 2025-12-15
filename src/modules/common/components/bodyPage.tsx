"use client";

import { Title } from "@/components";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  headerAction?: React.ReactNode;
}

export function BodyPage({
  children,
  title,
  subtitle,
  className,
  headerAction,
}: Props) {
  return (
    // CAMBIO 1: Reduje el padding externo (p-2 en móvil, p-4 en escritorio).
    // Esto hace que el contenido se pegue mucho más a los bordes para ganar espacio.
    <div className={cn("w-full flex flex-col gap-4 p-2 md:p-4", className)}>
      {/* Encabezado */}
      {(title || subtitle || headerAction) && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-1">
          <div className="space-y-1">
            {title && (
              <div className="text-blue-950">
                <Title
                  title={title}
                  subtitle={subtitle}
                  className="text-2xl font-bold tracking-tight"
                />
              </div>
            )}
          </div>
          {headerAction && <div className="flex-shrink-0">{headerAction}</div>}
        </div>
      )}

      {/* CAMBIO 2: Contenedor de contenido "Full Canvas" */}
      {/* Mantenemos el borde y sombra sutiles, pero maximizamos el área interna */}
      <div className="flex-1 rounded-lg border border-blue-100 bg-white shadow-sm overflow-hidden min-h-[calc(100vh-140px)]">
        {/* Padding interno cómodo para que el texto no toque el borde, pero no exagerado */}
        <div className="h-full w-full p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
}
