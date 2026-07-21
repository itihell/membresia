"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateAsistencia } from "@/actions";
import { useQueryAsistencia } from "@/modules/eventos/hooks";
import { AgregarPersonaDialog } from "./AgregarPersonaDialog";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  FaCheck,
  FaXmark,
  FaUserPlus,
  FaMagnifyingGlass,
  FaPerson,
  FaPersonDress,
  FaPersonHalfDress,
} from "react-icons/fa6";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventoId: string | null;
}

export function AsistenciasSheet({ open, onOpenChange, eventoId }: Props) {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const { data, isPending, refetch } = useQueryAsistencia(eventoId ?? "");
  const evento = data;
  const asistencias = data?.eventos_has_asistencia ?? [];

  const filteredAsistencias = useMemo(() => {
    if (!search.trim()) return asistencias;
    const q = search
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return asistencias.filter(a => {
      const nombre = `${a.persona?.nombres ?? ""} ${a.persona?.apellidos ?? ""}`
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      return nombre.includes(q);
    });
  }, [asistencias, search]);

  const stats = useMemo(() => {
    const hombres = asistencias.filter(
      a => a.persona?.sexo_id === 1 && a.asistio
    ).length;
    const mujeres = asistencias.filter(
      a => a.persona?.sexo_id === 2 && a.asistio
    ).length;
    const total = asistencias.filter(a => a.asistio).length;
    return { hombres, mujeres, total };
  }, [asistencias]);

  const handleToggle = async (id: string, status: boolean) => {
    setLoadingId(id);
    try {
      await updateAsistencia(id, status);
      await refetch();
    } catch {
      toast.error("Error al actualizar la asistencia");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg flex flex-col p-0 gap-0"
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-blue-700 to-blue-600 text-white p-5 shrink-0">
            <SheetHeader className="text-left">
              <SheetTitle className="text-white text-lg font-bold">
                {isPending ? "Cargando..." : (evento?.title ?? "Evento")}
              </SheetTitle>
              <SheetDescription className="text-blue-200 text-sm">
                {evento?.date
                  ? format(new Date(evento.date), "dd 'de' MMMM, yyyy", {
                      locale: es,
                    })
                  : ""}
              </SheetDescription>
            </SheetHeader>

            {/* Stats rápidas */}
            {!isPending && (
              <div className="flex gap-4 mt-4">
                <div className="flex items-center gap-1.5 bg-white/10 rounded-lg px-3 py-1.5">
                  <FaPersonHalfDress size={16} />
                  <span className="text-sm font-semibold">{stats.total}</span>
                  <span className="text-xs text-blue-200">total</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 rounded-lg px-3 py-1.5">
                  <FaPerson size={16} />
                  <span className="text-sm font-semibold">{stats.hombres}</span>
                  <span className="text-xs text-blue-200">H</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 rounded-lg px-3 py-1.5">
                  <FaPersonDress size={16} />
                  <span className="text-sm font-semibold">{stats.mujeres}</span>
                  <span className="text-xs text-blue-200">M</span>
                </div>
              </div>
            )}
          </div>

          {/* Toolbar: búsqueda + botón agregar */}
          <div className="p-4 border-b border-gray-100 bg-gray-50 shrink-0 flex gap-2 items-center">
            <div className="relative flex-1">
              <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              <Input
                className="pl-8 h-9 text-sm border-blue-200 focus:ring-blue-500"
                placeholder="Buscar miembro..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <Button
              size="sm"
              className="btn-success shrink-0 flex gap-1.5 items-center"
              onClick={() => setDialogOpen(true)}
            >
              <FaUserPlus size={13} />
              <span className="hidden sm:block">Agregar</span>
            </Button>
          </div>

          {/* Lista de asistencias */}
          <div className="flex-1 overflow-y-auto">
            {isPending ? (
              <div className="flex flex-col items-center justify-center h-40 gap-2 text-gray-400">
                <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">Cargando asistencias...</span>
              </div>
            ) : filteredAsistencias.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                <FaMagnifyingGlass size={28} className="mb-2 opacity-40" />
                <p className="text-sm">
                  {search
                    ? "No se encontraron personas"
                    : "Sin registros de asistencia"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredAsistencias.map((asistencia, index) => (
                  <div
                    key={asistencia.id}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 hover:bg-blue-50/60 transition-colors",
                      asistencia.asistio && "bg-green-50/30"
                    )}
                  >
                    {/* Número */}
                    <span className="text-xs text-gray-400 w-5 shrink-0 text-right">
                      {index + 1}
                    </span>

                    {/* Avatar inicial */}
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                        asistencia.persona?.sexo_id === 1
                          ? "bg-blue-100 text-blue-700"
                          : "bg-pink-100 text-pink-700"
                      )}
                    >
                      {asistencia.persona?.nombres?.charAt(0) ?? "?"}
                    </div>

                    {/* Nombre */}
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          "text-sm font-medium truncate",
                          asistencia.asistio
                            ? "text-green-800"
                            : "text-gray-700"
                        )}
                      >
                        {asistencia.persona?.nombres}{" "}
                        {asistencia.persona?.apellidos}
                      </p>
                    </div>

                    {/* Toggle asistencia */}
                    <button
                      type="button"
                      disabled={loadingId === asistencia.id}
                      onClick={() =>
                        handleToggle(asistencia.id!, asistencia.asistio)
                      }
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm shrink-0",
                        asistencia.asistio
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-red-100 hover:bg-red-200 text-red-500 border border-red-200",
                        loadingId === asistencia.id &&
                          "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {loadingId === asistencia.id ? (
                        <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                      ) : asistencia.asistio ? (
                        <FaCheck size={12} />
                      ) : (
                        <FaXmark size={12} />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer con conteo */}
          {!isPending && asistencias.length > 0 && (
            <div className="shrink-0 px-4 py-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-500 text-center">
              {filteredAsistencias.length} de {asistencias.length} personas
              {search && " (filtradas)"}
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Dialog para agregar persona nueva */}
      {eventoId && (
        <AgregarPersonaDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          eventoId={eventoId}
          onPersonaAgregada={() => refetch()}
        />
      )}
    </>
  );
}
