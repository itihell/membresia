"use client";

import type { MembresiaType } from "@/schemas";
import { MembresiaSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { ListPersonas } from "../ui/lists/list-personas";
import { ListTipoMembresia } from "../ui/lists/list-tipo-membresia";
import { FaBan, FaFloppyDisk } from "react-icons/fa6";
import { Switch } from "../ui/switch";
import {
  createMembresia,
  getMembresiaById,
  getPeopleId,
  updateMembresia,
} from "@/actions";
import type { Membresia } from "@/interfaces";
import { toast } from "sonner";
import { DataPicker } from "@/modules/common";

interface Props {
  id?: string;
}

export const FormMembresia = ({ id }: Props) => {
  const params = useSearchParams();
  const personaId = params.get("persona");
  const route = useRouter();

  const form = useForm<MembresiaType>({
    resolver: zodResolver(MembresiaSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (personaId) {
      (async () => {
        const persona = await getPeopleId(personaId);
        const data = {
          persona_id: personaId,
          persona: persona,
        };
        form.reset(data);
      })();
    }
  }, [personaId, form]);

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
    } catch (error) {
      console.error({ error });
    }
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
                      <DataPicker
                        date={field.value}
                        setDate={field.onChange}
                        placeholder="Fecha de Membresia"
                      />
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
                          checked={!!field.value}
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
                  onClick={() => {
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
