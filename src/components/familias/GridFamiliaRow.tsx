"use client";
import type { Familia } from "@/interfaces";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  familia: Familia;
  index: number;
}
export const GridFamiliaRow = ({ familia, index }: Props) => {
  const router = useRouter();
  const params = useSearchParams();
  const familiaId = params.get("familia");
  const onSelectedPeople = (id: string) => {
    router.push(`/familias/${id}`);
  };
  return (
    <div
      onClick={() => {
        onSelectedPeople(familia.id as string);
      }}
      className={cn(
        "grid grid-cols-12 py-2 hover:bg-blue-300 hover:cursor-pointer border-b border-blue-500",
        familia.id === familiaId && "bg-blue-200"
      )}
    >
      <div className="col-span-1 pl-3">{index + 1}</div>
      <div className="col-span-8">{familia?.name}</div>
    </div>
  );
};
