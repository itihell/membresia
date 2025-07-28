"use client";
import { FamiliaSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaBan, FaFloppyDisk } from "react-icons/fa6";
import { createFamilia, getFamiliaById, updateFamilia } from "@/actions";
import type { Familia } from "@/interfaces";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
interface Props {
  id?: string;
}
export const FormFamilia = ({ id }: Props) => {
  const route = useRouter();

  const form = useForm<z.infer<typeof FamiliaSchema>>({
    resolver: zodResolver(FamiliaSchema),
    defaultValues: { name: "" },
  });

  useEffect(() => {
    if (id) {
      (async () => {
        const familia = await getFamiliaById(id);
        form.reset(familia);
      })();
    }
  }, [id, form]);

  const onSubmit = async (data: z.infer<typeof FamiliaSchema>) => {
    try {
      if (id) {
        const familia = await updateFamilia(id, data as Familia);
        if (familia.id) {
          toast.success("Éxito", {
            description: "Familia actaulizada con éxito",
            classNames: {
              toast: "!bg-green-100 border !border-green-300",
              title: "text-green-800 text-xl border-b border-green-600",
              description: "!text-green-600",
            },
          });
          route.push(`/familias/${familia.id}?familia=${familia.id}`);
        }
      } else {
        const familia = await createFamilia(data as Familia);
        if (familia.id) {
          toast.success("Éxito", {
            description: "Familia agregada con éxito",
            classNames: {
              toast: "!bg-green-100 border !border-green-300",
              title: "text-green-800 text-xl border-b border-green-600",
              description: "!text-green-600",
            },
          });
          route.push(`/familias/${familia.id}`);
        }
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error al guardar el registro";
      return toast.error("ERROR", {
        description: message,
        classNames: {
          toast: "!bg-red-100 border !border-red-300",
          title: "text-red-800 text-xl border-b border-red-600",
          description: "!text-red-600",
        },
      });
    }
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-12 mt-1">
            <div className="col-span-3 md:justify-end mr-1 flex items-center">
              <label className="font-bold">Familia</label>
            </div>
            <div className="col-span-9">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Castro López" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-12 mt-8">
            <div className="col-span-3 md:justify-end mr-1 flex items-center"></div>
            <div className="col-span-9">
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
  );
};
