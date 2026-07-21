"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ListBarrios, ListEstadoCivil, ListSexo } from "@/components";
import { PeopleSchema, type PeopleType } from "@/schemas";
import { savePeople } from "@/actions";
import { addPersonaToEvento } from "@/actions";
import { FaFloppyDisk, FaXmark } from "react-icons/fa6";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventoId: string;
  onPersonaAgregada: () => void;
}

export function AgregarPersonaDialog({
  open,
  onOpenChange,
  eventoId,
  onPersonaAgregada,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PeopleType>({
    resolver: zodResolver(PeopleSchema),
    defaultValues: {
      nombres: "",
      apellidos: "",
      cedula: "",
      telefono: "",
      direccion: "",
      email: "",
      sexo_id: 0,
      estado_civil_id: 0,
      barrio_id: 0,
    },
  });

  const onSubmit = async (data: PeopleType) => {
    setIsLoading(true);
    try {
      const persona = await savePeople(data);
      if (persona?.id) {
        await addPersonaToEvento(eventoId, persona.id);
        toast.success(
          `${data.nombres} ${data.apellidos} fue agregada al evento`
        );
        form.reset();
        onOpenChange(false);
        onPersonaAgregada();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al agregar la persona");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-blue-900 flex items-center gap-2">
            Agregar Nueva Persona al Evento
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Nombres y Apellidos en grid */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="nombres"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombres</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan Ernesto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="apellidos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellidos</FormLabel>
                    <FormControl>
                      <Input placeholder="Pérez López" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="cedula"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cédula / Identidad</FormLabel>
                    <FormControl>
                      <Input placeholder="12-090703-0004F" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="7847-8987" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="direccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder="Dirección de residencia" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <ListSexo form={form} campo="sexo_id" nameRelation="sexo" />
              <ListEstadoCivil
                form={form}
                campo="estado_civil_id"
                nameRelation="EstadoCivil"
              />
            </div>

            <ListBarrios form={form} campo="barrio_id" nameRelation="barrios" />

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                <FaXmark className="mr-1" /> Cancelar
              </Button>
              <Button
                type="submit"
                className="btn-primary"
                disabled={isLoading}
              >
                <FaFloppyDisk className="mr-1" />
                {isLoading ? "Guardando..." : "Guardar y Agregar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
