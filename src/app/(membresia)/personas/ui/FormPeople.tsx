"use client";
import { getPeopleId, savePeople, updatePeople } from "@/actions";
import { ListBarrios, ListEstadoCivil, ListSexo } from "@/components";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { titleFont } from "@/config/fonts";
import { People } from "@/interfaces";
import { cn } from "@/lib/utils";
import { PeopleSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaAddressBook,
  FaBan,
  FaCalendarCheck,
  FaFloppyDisk,
  FaMapLocation,
  FaUser,
} from "react-icons/fa6";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  id?: string;
}

export const FormPeople = ({ id }: Props) => {
  const [openNacimiento, setOpenNacimiento] = useState(false);
  const [openFe, setOpenFe] = useState(false);
  const [openBautismo, setOpenBautismo] = useState(false);
  const route = useRouter();
  const form = useForm<z.infer<typeof PeopleSchema>>({
    resolver: zodResolver(PeopleSchema),
    defaultValues: {
      nombres: "",
      apellidos: "",
      cedula: "",
      telefono: "",
      direccion: "",
      email: "",
    },
  });

  useEffect(() => {
    (async () => {
      if (id) {
        const data: People | null = await getPeopleId(id);

        if (data?.id) {
          const dataTransform = {
            ...data,
            telefono: data.telefono ?? undefined,
            email: data.email ?? undefined,
            cedula: data.cedula ?? undefined,
          };
          form.reset(dataTransform);
        }
      }
    })();
  }, [form, id]);

  const onSubmit = async (data: z.infer<typeof PeopleSchema>) => {
    try {
      if (id) {
        const people = await updatePeople(id as string, data);

        toast.success("Éxito", {
          description: "Registro actualizado con éxito",
          classNames: {
            toast: "!bg-green-100 border !border-green-300",
            title: "text-green-800 text-xl border-b border-green-600",
            description: "!text-green-600",
          },
        });

        route.push(`/personas/${people.id}`);
      } else {
        const people = await savePeople(data);
        toast.success("Éxito", {
          description: "Registro creado con éxito",
          classNames: {
            toast: "!bg-green-100 border !border-green-300",
            title: "text-green-800 text-xl border-b border-green-600",
            description: "!text-green-600",
          },
        });
        route.push(`/personas/${people.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="border-b border-blue-400 mt-10">
              <div className="flex ">
                <FaUser className="text-blue-900 text-2xl" />
                <h1
                  className={`${titleFont.className} text-blue-900 text-2xl ml-2`}
                >
                  Generales
                </h1>
              </div>
            </div>

            <div className="grid md:grid-cols-12 mt-1">
              <div className="col-span-3 md:justify-end mr-1 flex items-center">
                <label className="font-bold">Nombres</label>
              </div>
              <div className="col-span-9">
                <FormField
                  control={form.control}
                  name="nombres"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Juan Ernesto" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-12 mt-3">
              <div className="col-span-3 md:justify-end mr-1 flex items-center">
                <label className="font-bold">Apellidos</label>
              </div>
              <div className="col-span-9">
                <FormField
                  control={form.control}
                  name="apellidos"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Pérez López" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-12 mt-3">
              <div className="col-span-3 md:justify-end mr-1 flex items-center">
                <label className="font-bold">Identidad</label>
              </div>
              <div className="col-span-9">
                <FormField
                  control={form.control}
                  name="cedula"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="12-090703-0004F" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-12 mt-1">
              <div className="col-span-3 md:justify-end mr-1 flex items-center">
                <label className="font-bold">Sexo</label>
              </div>
              <div className="col-span-9">
                <ListSexo form={form} campo="sexo_id" nameRelation="sexo" />
              </div>
            </div>
            <div className="grid md:grid-cols-12 mt-1">
              <div className="col-span-3 md:justify-end mr-1 flex items-center">
                <label className="font-bold">Estado Civil</label>
              </div>
              <div className="col-span-9">
                <ListEstadoCivil
                  form={form}
                  campo="estado_civil_id"
                  nameRelation="EstadoCivil"
                />
              </div>
            </div>

            <div className="border-b border-blue-400 mt-10">
              <div className="flex ">
                <FaCalendarCheck className="text-blue-900 text-2xl" />
                <h1
                  className={`${titleFont.className} text-blue-900 text-2xl ml-2`}
                >
                  Fechas
                </h1>
              </div>
            </div>

            <div className="grid md:grid-cols-12 mt-1">
              <div className="col-span-3 md:justify-end mr-1 flex items-center">
                <label className="font-bold">Fecha de nacimiento</label>
              </div>
              <div className="col-span-9">
                <FormField
                  control={form.control}
                  name="fecha_nacimiento"
                  render={({ field }) => (
                    <FormItem>
                      <Popover
                        open={openNacimiento}
                        onOpenChange={setOpenNacimiento}
                      >
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
                              setOpenNacimiento(false);
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
                <label className="font-bold">Fecha de Fe</label>
              </div>
              <div className="col-span-9">
                <FormField
                  control={form.control}
                  name="fecha_fe"
                  render={({ field }) => (
                    <FormItem>
                      <Popover open={openFe} onOpenChange={setOpenFe}>
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
                                <span>Fecha de Fe</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            onDayClick={(e) => {
                              setOpenFe(false);
                            }}
                            captionLayout="dropdown-buttons"
                            fromYear={1970}
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
                <label className="font-bold">Fecha de Bautismo</label>
              </div>
              <div className="col-span-9">
                <FormField
                  control={form.control}
                  name="fecha_bautizo"
                  render={({ field }) => (
                    <FormItem>
                      <Popover
                        open={openBautismo}
                        onOpenChange={setOpenBautismo}
                      >
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
                                <span>Fecha de Bautismo</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            onDayClick={(e) => {
                              setOpenBautismo(false);
                            }}
                            captionLayout="dropdown-buttons"
                            fromYear={1970}
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

            <div className="border-b border-blue-400 mt-10">
              <div className="flex ">
                <FaMapLocation className="text-blue-900 text-2xl" />
                <h1
                  className={`${titleFont.className} text-blue-900 text-2xl ml-2`}
                >
                  Ubicacion
                </h1>
              </div>
            </div>

            <div className="grid md:grid-cols-12 mt-1">
              <div className="col-span-3 md:justify-end mr-1 flex items-center">
                <label className="font-bold">Barrio</label>
              </div>
              <div className="col-span-9">
                <ListBarrios
                  form={form}
                  campo="barrio_id"
                  nameRelation="barrios"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-12 mt-1">
              <div className="col-span-3 md:justify-end mr-1 flex items-center">
                <label className="font-bold">Dirección</label>
              </div>
              <div className="col-span-9">
                <FormField
                  control={form.control}
                  name="direccion"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea placeholder="Dirección" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="border-b border-blue-400 mt-10">
              <div className="flex ">
                <FaAddressBook className="text-blue-900 text-2xl" />
                <h1
                  className={`${titleFont.className} text-blue-900 text-2xl ml-2`}
                >
                  Contacto
                </h1>
              </div>
            </div>

            <div className="grid md:grid-cols-12 mt-3">
              <div className="col-span-3 md:justify-end mr-1 flex items-center">
                <label className="font-bold">Teléfono</label>
              </div>
              <div className="col-span-9">
                <FormField
                  control={form.control}
                  name="telefono"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="7847-8987" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-12 mt-3">
              <div className="col-span-3 md:justify-end mr-1 flex items-center">
                <label className="font-bold">Email</label>
              </div>
              <div className="col-span-9">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="juan@ejemplo.com" {...field} />
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
