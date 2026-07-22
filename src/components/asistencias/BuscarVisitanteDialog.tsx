"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchPersonasVisitantes, addPersonaToEvento } from "@/actions";
import { FaMagnifyingGlass, FaPlus, FaSpinner } from "react-icons/fa6";
import { toast } from "sonner";
import type { Persona } from "@prisma/client";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventoId: string;
  onPersonaAgregada: () => void;
}

export function BuscarVisitanteDialog({
  open,
  onOpenChange,
  eventoId,
  onPersonaAgregada,
}: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Persona[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [addingId, setAddingId] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const personas = await searchPersonasVisitantes(eventoId, query);
      setResults(personas as Persona[]);
    } catch (error) {
      console.error(error);
      toast.error("Error al buscar personas");
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddVisitante = async (persona: Persona) => {
    setAddingId(persona.id);
    try {
      await addPersonaToEvento(eventoId, persona.id, true);
      toast.success(
        `${persona.nombres} ${persona.apellidos} agregado como visitante`
      );
      onPersonaAgregada();
      // Remover de los resultados para que no lo vuelva a agregar
      setResults(prev => prev.filter(p => p.id !== persona.id));
    } catch (error) {
      console.error(error);
      toast.error("Error al agregar como visitante");
    } finally {
      setAddingId(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-blue-900">
            Buscar y Agregar Visitante
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Buscar por nombre o cédula..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <Button type="submit" disabled={isSearching} className="btn-primary">
            {isSearching ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaMagnifyingGlass />
            )}
          </Button>
        </form>

        <div className="mt-4 max-h-60 overflow-y-auto border rounded-md">
          {results.length === 0 && !isSearching && query && (
            <div className="p-4 text-center text-gray-500">
              No se encontraron resultados
            </div>
          )}
          {results.map(persona => (
            <div
              key={persona.id}
              className="flex justify-between items-center p-3 border-b last:border-0 hover:bg-gray-50"
            >
              <div>
                <p className="font-medium text-sm">
                  {persona.nombres} {persona.apellidos}
                </p>
                {persona.cedula && (
                  <p className="text-xs text-gray-500">{persona.cedula}</p>
                )}
              </div>
              <Button
                size="sm"
                variant="outline"
                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                onClick={() => handleAddVisitante(persona)}
                disabled={addingId === persona.id}
              >
                {addingId === persona.id ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <>
                    <FaPlus className="mr-1" />
                    Agregar
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
