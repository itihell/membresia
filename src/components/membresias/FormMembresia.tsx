"use client";

import { MembresiaSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { useEffect, useState } from "react";
import { ListPersonas } from "../ui/lists/list-personas";
import { ListTipoMembresia } from "../ui/lists/list-tipo-membresia";
import { FaBan, FaFloppyDisk } from "react-icons/fa6";
import { Switch } from "../ui/switch";
import { createMembresia, getMembresiaById, updateMembresia } from "@/actions";
import { Membresia } from "@/interfaces";
import { toast } from "sonner";

interface Props {
  id?: string;
}

export const FormMembresia = ({ id }: Props) => {
  const params = useSearchParams();
  const route = useRouter();
  const [openFecha, setOpenFecha] = useState(false);

  const form = useForm<z.infer<typeof MembresiaSchema>>({
    resolver: zodResolver(MembresiaSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (id) {
      (async () => {
        const membresia = await getMembresiaById(id);
        form.reset(membresia);
      })();
    }
  }, [id, form]);

  const onSubmit = async (data: z.infer<typeof MembresiaSchema>) => {
    try {
      let tab = params.get("tab");
      if (!tab) {
        tab = "general";
      }
      if (id) {
        const membresia = await updateMembresia(id, data as Membresia);
        if (membresia.id) {
          toast.success("Éxito", {
            description: "Registro actualizado con éxito",
            classNames: {
              toast: "!bg-green-100 border !border-green-300",
              title: "text-green-800 text-xl border-b border-green-600",
              description: "!text-green-600",
            },
          });
          route.push(`/personas/${membresia.persona_id}?tab=${tab}&id=${id}`);
        }
      } else {
        const membresia = await createMembresia(data as Membresia);
        if (membresia.id) {
          toast.success("Éxito", {
            description: "Registro creado con éxito",
            classNames: {
              toast: "!bg-green-100 border !border-green-300",
              title: "text-green-800 text-xl border-b border-green-600",
              description: "!text-green-600",
            },
          });
          route.push(
            `/personas/${membresia.persona_id}?tab=${tab}&id=${membresia.id}`
          );
        }
      }
    } catch (error) {}
  };
  return (
    <div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-12 mt-1">
              <div className="col-span-3 md:justify-end mr-1 flex items-center">
                <label className="font-bold">Persona</label>
              </div>
              <div className="col-span-9">
                <ListPersonas
                  form={form}
                  campo="persona_id"
                  nameRelation="persona"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-12 mt-1">
              <div className="col-span-3 md:justify-end mr-1 flex items-center">
                <label className="font-bold">Fecha Membresia</label>
              </div>
              <div className="col-span-9">
                <FormField
                  control={form.control}
                  name="fecha"
                  render={({ field }) => (
                    <FormItem>
                      <Popover open={openFecha} onOpenChange={setOpenFecha}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "d-MM-yyyy")
                              ) : (
                                <span>Fecha de nacimiento</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            onDayClick={(e) => {
                              setOpenFecha(false);
                            }}
                            captionLayout="dropdown-buttons"
                            fromYear={1940}
                            toYear={new Date().getFullYear()}
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-12 mt-1">
              <div className="col-span-3 md:justify-end mr-1 flex items-center">
                <label className="font-bold">Tipo Membresia</label>
              </div>
              <div className="col-span-9">
                <ListTipoMembresia
                  form={form}
                  campo="tipo_id"
                  nameRelation="tipoMembresia"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-12">
              <div className="col-span-3"></div>
              <div className="col-span-9">
                <FormField
                  control={form.control}
                  name="activo"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Es un miembro activo</FormLabel>
                        <FormDescription>
                          Marque esta opción si es un miembro activo
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value ? true : false}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="right-8 bottom-8 fixed">
              <div>
                <Button
                  type="button"
                  className="!rounded-r-none btn-warning"
                  onClick={(e) => {
                    history.back();
                  }}
                >
                  <FaBan />
                  <span className="ml-2">Cancelar</span>
                </Button>
                <Button type="submit" className="!rounded-l-none btn-primary">
                  <FaFloppyDisk />
                  {id && <span className="ml-2">Actualizar</span>}
                  {!id && <span className="ml-2">Guardar</span>}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
