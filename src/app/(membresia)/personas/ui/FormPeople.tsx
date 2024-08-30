"use client";
import { getPeopleId, savePeople, testSession, updatePeople } from "@/actions";
import { ListBarrios, ListEstadoCivil, ListSexo } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { titleFont } from "@/config/fonts";
import { People } from "@/interfaces";
import { PeopleSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaAddressBook, FaBan, FaFloppyDisk } from "react-icons/fa6";
import { z } from "zod";

interface Props {
  id?: string;
}

export const FormPeople = ({ id }: Props) => {
  const session = useSession();
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
    if (id) {
      const people = await updatePeople(id as string, data);
      console.log({ data, people });
      route.push("/personas");
    } else {
      const people = await savePeople(data);
      console.log({ data, people });
      route.push("/personas");
    }
  };

  return (
    <div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
