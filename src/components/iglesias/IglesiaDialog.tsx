"use client";

import { useState, useEffect } from "react";
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

import type { IglesiaType } from "@/schemas";
import { iglesiaSchema } from "@/schemas";
import { saveIglesia, updateIglesia } from "@/actions";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  iglesia?: any;
}

export const IglesiaDialog = ({ open, onOpenChange, iglesia }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<IglesiaType>({
    resolver: zodResolver(iglesiaSchema),
    defaultValues: {
      name: iglesia?.name || "",
      email: iglesia?.email || "",
      direccion: iglesia?.direccion || "",
      telefonos: iglesia?.telefonos || "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: iglesia?.name || "",
        email: iglesia?.email || "",
        direccion: iglesia?.direccion || "",
        telefonos: iglesia?.telefonos || "",
      });
    }
  }, [open, iglesia, form]);

  const onSubmit = async (data: IglesiaType) => {
    setIsLoading(true);
    try {
      if (iglesia) {
        await updateIglesia(iglesia.id, data);
        toast.success("Iglesia actualizada correctamente");
      } else {
        await saveIglesia(data);
        toast.success("Iglesia creada correctamente");
      }
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error(
        iglesia ? "Error al actualizar la iglesia" : "Error al crear la iglesia"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Necesitamos reiniciar el formulario cuando el modal se abre con nueva info
  // Pero lo manejamos desde el padre o con un useEffect si es necesario

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {iglesia ? "Editar Iglesia" : "Nueva Iglesia"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre de la iglesia" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="correo@ejemplo.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="direccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder="Dirección física" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefonos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfonos</FormLabel>
                  <FormControl>
                    <Input placeholder="+123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
