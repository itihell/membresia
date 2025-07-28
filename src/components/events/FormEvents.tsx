"use client";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { EventoSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { useEffect, useState } from "react";
import { ListTipoEventos } from "../ui/lists/list-tipo-eventos";
import { FaBan, FaFloppyDisk } from "react-icons/fa6";
import { useCustomError } from "@/hooks";
import { Textarea } from "../ui/textarea";
import { createEvent } from "@/actions";
import { useRouter } from "next/navigation";

interface Props {
  id?: string;
}
export const FormEvents = ({ id }: Props) => {
  const router = useRouter();
  const useErrors = useCustomError();
  const [openDate, setOpenDate] = useState(false);
  const form = useForm<z.infer<typeof EventoSchema>>({
    resolver: zodResolver(EventoSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
    },
  });

  useEffect(() => {
    if (form?.formState?.errors) {
      const errors = form?.formState?.errors;
      useErrors.handlerValidaError(errors);
    }
  }, [form.formState.errors, useErrors]);

  const onSubmit = async (data: z.infer<typeof EventoSchema>) => {
    try {
      const evento = await createEvent(data);
      if (evento.id) {
        useErrors.handlerSingleSuccess(
          "Éxito",
          "Evento guardado correctamente"
        );

        router.push(`/eventos/${evento.id}`);
      }
    } catch (error) {
      console.error({ error });
    }
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <div className="grid md:grid-cols-12 mt-1">
              <div className="col-span-3 md:justify-end mr-3 flex items-center">
                <label className="font-bold">Fecha</label>
              </div>
              <div className="col-span-9">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <Popover open={openDate} onOpenChange={setOpenDate}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal border-list",
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
                            onDayClick={() => {
                              setOpenDate(false);
                            }}
                            fromYear={1940}
                            toYear={new Date().getFullYear()}
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={field.onChange}
                            disabled={date =>
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
              <div className="col-span-3 md:justify-end mr-3 flex items-center">
                <label className="font-bold">Título</label>
              </div>
              <div className="col-span-9">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-12 mt-1">
              <div className="col-span-3 md:justify-end mr-3 flex items-center">
                <label className="font-bold">Tipo</label>
              </div>
              <div className="col-span-9">
                <ListTipoEventos
                  form={form}
                  campo="tipo_evento_id"
                  nameRelation="tipos_evento"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-12 mt-1">
              <div className="col-span-3 md:justify-end mr-3 flex items-center">
                <label className="font-bold">Descripción</label>
              </div>
              <div className="col-span-9">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea placeholder="Descripción" {...field} />
                      </FormControl>
                      <FormMessage />
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
                  onClick={() => {
                    history.back();
                  }}
                >
                  <FaBan />
                  <span className="ml-2 md:block hidden">Cancelar</span>
                </Button>
                <Button type="submit" className="!rounded-l-none btn-primary">
                  <FaFloppyDisk />
                  <span className="md:block hidden">
                    {id && <span className="ml-2">Actualizar</span>}
                    {!id && <span className="ml-2">Guardar</span>}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
