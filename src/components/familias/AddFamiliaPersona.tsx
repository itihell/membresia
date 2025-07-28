"use client";

import { ListFamilias } from "../ui/lists/list-familias";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { ListParentesco } from "../ui/lists/list-parentesco";
import { Button } from "../ui/button";
import { FaFloppyDisk } from "react-icons/fa6";
import { createMiembroHasFamilia } from "@/actions";
import { toast } from "sonner";
import type { FamiliaHasPersona } from "@/interfaces";
import { useEffect } from "react";
import type { FamiliaHasPersonaType } from "@/modules/peoples/schemas";
import { FamiliaHasPersonaSchema } from "@/modules/peoples/schemas";

interface Props {
  personaId: string;
  created: (miembro: FamiliaHasPersona) => void;
}
export const AddFamiliaPersona = ({ personaId, created }: Props) => {
  const form = useForm<FamiliaHasPersonaType>({
    resolver: zodResolver(FamiliaHasPersonaSchema),
    defaultValues: {
      persona_id: personaId,
    },
  });

  useEffect(() => {
    form.setValue("persona_id", personaId);
  }, [personaId, form]);

  useEffect(() => {
    const errors = form.formState.errors; // TypeScript ya sabe que es FieldErrors<z.infer<typeof FormSchema>>

    // `Object.keys(errors)` nos da un array de strings que son las claves de los errores.
    // `as Array<keyof z.infer<typeof FormSchema>>` le dice a TypeScript
    // que estas claves serán los nombres de los campos de tu esquema.
    const errorKeys = Object.keys(errors) as Array<keyof FamiliaHasPersonaType>;

    if (errorKeys.length > 0) {
      // Verifica si el objeto 'errors' tiene propiedades
      errorKeys.forEach(key => {
        // Ahora 'key' tiene el tipo correcto (ej. 'persona_id' | 'familia_id' | 'parentesco_id')
        const errorForField = errors[key];

        // `errorForField` será de tipo `FieldError` (o `FieldError[]` en caso de arrays).
        // Para acceder al mensaje, debes asegurarte de que existe y es un objeto de error simple,
        // o manejar el caso de `FieldError[]` si tu ZodSchema puede generar errores de array.
        // Para Zod, FieldError.message es un string directamente.
        const errorMessage = errorForField?.message as string; // 'as string' es un cast seguro aquí

        if (errorMessage) {
          // Asegúrate de que el mensaje no sea undefined/null
          toast.error("ERROR", {
            description: errorMessage,
            classNames: {
              toast: "!bg-red-100 border !border-red-300",
              title: "text-red-800 text-xl border-b border-red-600",
              description: "!text-red-600",
            },
          });
        }
      });
    }
  }, [form.formState.errors]);

  const onSubmit = async (data: FamiliaHasPersonaType) => {
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
    } catch (error) {
      const message =
        error instanceof Error
          ? error?.message
          : "Error al guardar el registro";
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
