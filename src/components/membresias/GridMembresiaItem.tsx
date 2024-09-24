"use client";

import { Membresia, People } from "@/interfaces";
import { useRouter } from "next/navigation";

interface Props {
  miembro: Membresia;
  index: number;
}

export const GridMembresiaItem = ({ miembro, index }: Props) => {
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
      <div className="col-span-1">{index + 1}</div>
      <div className="col-span-7">
        {` ${miembro?.persona?.apellidos} ${miembro?.persona?.nombres} `}
      </div>
      <div className="col-span-4">{miembro?.persona?.telefono}</div>
    </div>
  );
};
