"use client";
import { Familia } from "@/interfaces";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  familia: Familia;
}
export const GridFamiliaRow = ({ familia }: Props) => {
  const router = useRouter();
  const params = useSearchParams();
  const familiaId = params.get("familia");
  const onSelectedPeople = (id: string) => {
    router.push(`/familias/${id}`);
  };
  return (
    <div
      onClick={(e) => {
        onSelectedPeople(familia.id as string);
      }}
      className={cn(
        "grid grid-cols-12 py-2 hover:bg-blue-300 hover:cursor-pointer border-b border-blue-500",
        familia.id === familiaId && "bg-blue-200"
      )}
    >
      <div className="col-span-8">{familia?.name}</div>
    </div>
  );
};
