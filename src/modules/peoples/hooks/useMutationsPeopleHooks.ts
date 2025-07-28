// "use client"; // No es necesario si solo exportas el hook

import { updatePeople } from "@/actions"; // Tu server action de actualización
import { TagsTanstack } from "@/modules/common/enum";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query"; // Asegúrate de importar tu interfaz People
import type { PeopleType } from "@/schemas";

export const useMutationUpdatePeople = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (updatedPeopleData: PeopleType) => {
      // Llama a tu server action para actualizar la persona
      // Asegúrate de que tu `updatePeople` action reciba el ID y los datos
      const result = await updatePeople(
        updatedPeopleData.id as string,
        updatedPeopleData
      );

      return result;
    },
    onSuccess: (data, variables) => {
      // 1. Invalida la query principal de la lista de personas
      // Esto forzará a `useQueryPeoples` a refetchear los datos
      queryClient.invalidateQueries({ queryKey: [TagsTanstack.PEOPLE] });

      // Opcional: Si también cacheas personas individualmente por ID, puedes invalidar/actualizar esa query
      queryClient.invalidateQueries({
        queryKey: [TagsTanstack.PEOPLE, variables.id],
      }); // Suponiendo que PEOPLE es 'personas'

      // Aquí podrías mostrar una notificación al usuario (ej. toast)
      toast.success("Éxito", {
        description: "Registro actualizado con éxito mutacion",
        classNames: {
          toast: "!bg-green-100 border !border-green-300",
          title: "text-green-800 text-xl border-b border-green-600",
          description: "!text-green-600",
        },
      });
    },
    onError: error => {
      console.error("Error al actualizar la persona:", error);
      // Aquí podrías mostrar un mensaje de error al usuario
    },
    // Opcional: Implementa onMutate para actualizaciones optimistas si quieres una UX instantánea
    // onMutate: async (newPeopleData) => {
    //   // Cancela cualquier refetching pendiente para evitar sobrescribir tu actualización optimista
    //   await queryClient.cancelQueries({ queryKey: [TagsTanstack.PEOPLE] });

    //   // Guarda el valor anterior de la caché por si necesitas revertir
    //   const previousPeoples = queryClient.getQueryData<People[]>([TagsTanstack.PEOPLE]);

    //   // Actualiza optimísticamente la lista en caché
    //   queryClient.setQueryData<People[]>([TagsTanstack.PEOPLE], (oldPeoples) =>
    //     oldPeoples ? oldPeoples.map(p => (p.id === newPeopleData.id ? { ...p, ...newPeopleData } : p)) : []
    //   );

    //   return { previousPeoples }; // Retorna el contexto para onError
    // },
    // onError: (err, newPeopleData, context) => {
    //   // Si falla, revierte la caché al estado anterior
    //   queryClient.setQueryData([TagsTanstack.PEOPLE], context?.previousPeoples);
    // },
    // onSettled: (data, error, variables, context) => {
    //   // Siempre refetchea después de la mutación, independientemente del éxito o fracaso
    //   queryClient.invalidateQueries({ queryKey: [TagsTanstack.PEOPLE] });
    // }
  });

  return mutation;
};
