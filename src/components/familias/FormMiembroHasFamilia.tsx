"use client";
import { MiembrosHasFamiliaSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { FaBan, FaFloppyDisk, FaUserPlus } from "react-icons/fa6";
import { ListParentesco } from "../ui/lists/list-parentesco";
import { ListPersonas } from "../ui/lists/list-personas";
import { createMiembroHasFamilia } from "@/actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";

interface Props {
  id?: string;
  familiaId?: string;
}

export const FormMiembroHasFamilia = ({ familiaId, id }: Props) => {
  const route = useRouter();
  const form = useForm<z.infer<typeof MiembrosHasFamiliaSchema>>({
    resolver: zodResolver(MiembrosHasFamiliaSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (familiaId) {
      form.setValue("familia_id", familiaId as string);
    }
  }, [familiaId, form]);

  const onSubmit = async (data: z.infer<typeof MiembrosHasFamiliaSchema>) => {
    if (id) {
      // update
    } else {
      // create
      const miembro = await createMiembroHasFamilia(data);
      toast.success("Éxito", {
        description: "Se agrego un nuevo miembro a la familia",
        classNames: {
          toast: "!bg-green-100 border !border-green-300",
          title: "text-green-800 text-xl border-b border-green-600",
          description: "!text-green-600",
        },
      });
      route.push(`/familias/${miembro.familia_id}?familia=${familiaId}`);
    }
  };
  return (
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
                nameRelation="persona"
                campo="persona_id"
              />
            </div>
          </div>
          <div className="md:grid-cols-12 mt-1 mb-3">
            <div className="flex justify-end text-right pr-3">
              <Link
                href="/personas/add"
                className="text-blue-500 hover:text-blue-700 flex items-center gap-3"
              >
                <FaUserPlus />
                Agregar persona
              </Link>
            </div>
          </div>
          <div className="grid md:grid-cols-12 mt-1">
            <div className="col-span-3 md:justify-end mr-1 flex items-center">
              <label className="font-bold">Parentesco</label>
            </div>
            <div className="col-span-9">
              <ListParentesco
                form={form}
                nameRelation="parentesco"
                campo="parentesco_id"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-12 mt-8">
            <div className="col-span-3 md:justify-end mr-1 flex items-center"></div>
            <div className="col-span-9">
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
  );
};
