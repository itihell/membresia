"use client";

import { Membresia, People } from "@/interfaces";
import { useRouter } from "next/navigation";

interface Props {
  miembro: Membresia;
}

export const GridMembresiaItem = ({ miembro }: Props) => {
  const router = useRouter();
  const onSelectedPeople = (id: string) => {
    router.push(`/membresias/edit/${id}`);
  };
  return (
    <div
      onClick={(e) => {
        onSelectedPeople(miembro.id as string);
      }}
      className="grid grid-cols-12 py-2 hover:bg-blue-300 hover:cursor-pointer border-b border-blue-500"
    >
      <div className="col-span-8">
        {miembro?.persona?.nombres} {miembro?.persona?.apellidos}
      </div>
      <div className="col-span-4">{miembro?.persona?.telefono}</div>
    </div>
  );
};
