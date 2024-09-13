"use client";

import { People } from "@/interfaces";
import { useRouter } from "next/navigation";

interface Props {
  people: People;
}

export const GridMembresiaItem = ({ people }: Props) => {
  const router = useRouter();
  const onSelectedPeople = (id: string) => {
    router.push(`/membresias/edit/${id}`);
  };
  return (
    <div
      onClick={(e) => {
        onSelectedPeople(people.id as string);
      }}
      className="grid grid-cols-12 py-2 hover:bg-blue-300 hover:cursor-pointer border-b border-blue-500"
    >
      <div className="col-span-8">
        {people.nombres} {people.apellidos}
      </div>
      <div className="col-span-4">{people.telefono}</div>
    </div>
  );
};
