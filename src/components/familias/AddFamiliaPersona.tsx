"use client";

import { z } from "zod";
import { ListFamilias } from "../ui/lists/list-familias";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { ListParentesco } from "../ui/lists/list-parentesco";
import { Button } from "../ui/button";
import { FaFloppyDisk } from "react-icons/fa6";
import { createMiembroHasFamilia } from "@/actions";
import { toast } from "sonner";
import { ErrorApp, FamiliaHasPersona } from "@/interfaces";
import { useEffect } from "react";

const FormSchema = z.object({
  persona_id: z.string({ message: "Debe seleccionar una persona" }),
  familia_id: z.string({ message: "Debe seleccionar una familia" }),
  parentesco_id: z.number({ message: "Debe seleccionar un parentesco" }),
});

interface Props {
  personaId: string;
  created: (miembro: FamiliaHasPersona) => void;
}
export const AddFamiliaPersona = ({ personaId, created }: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      persona_id: personaId,
    },
  });

  useEffect(() => {
    form.setValue("persona_id", personaId);
  }, [personaId, form]);

  useEffect(() => {
    const errors: any = form.formState.errors;
    if (errors) {
      for (const key in errors) {
        toast.error("ERROR", {
          description: errors[key]?.message as string,
          classNames: {
            toast: "!bg-red-100 border !border-red-300",
            title: "text-red-800 text-xl border-b border-red-600",
            description: "!text-red-600",
          },
        });
      }
    }
  }, [form.formState.errors]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const miembro = await createMiembroHasFamilia(data);
      if (miembro.id) {
        toast.success("Éxito", {
          description: "El miembro se agregó a la familia con éxito",
          classNames: {
            toast: "!bg-green-100 border !border-green-300",
            title: "text-green-800 text-xl border-b border-green-600",
            description: "!text-green-600",
          },
        });

        created(miembro);
      }
    } catch (error: ErrorApp | any) {
      const message = error?.message || "Error al guardar el registro";
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
              <ListFamilias
                form={form}
                campo="familia_id"
                nameRelation="familia"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-12 mt-1">
            <div className="col-span-3 md:justify-end mr-1 flex items-center">
              <label className="font-bold">Parentesco</label>
            </div>
            <div className="col-span-9">
              <ListParentesco
                form={form}
                campo="parentesco_id"
                nameRelation="parentesco"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-12 mt-1">
            <div className="col-span-3 md:justify-end mr-1 flex items-center"></div>
            <div className="col-span-9">
              <Button type="submit" className="btn-primary">
                <FaFloppyDisk />

                <span className="ml-2">Guardar</span>
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
