"use client";
import { Membresia } from "@/interfaces";
import { useEffect, useState } from "react";
import { GridMembresiaItem } from "./GridMembresiaItem";
import { getMembresias } from "@/actions";

export const GridMembresia = () => {
  const [miembros, setMiembros] = useState<Membresia[]>([]);

  useEffect(() => {
    (async () => {
      const mebresias = await getMembresias();
      setMiembros(mebresias);
    })();
  }, []);

  return (
    <div className="overflow-auto    rounded-md w-full shadow-lg">
      <div className="w-full shadow overflow-hidden rounded border-b border-gray-200">
        <div className="grid grid-cols-12 bg-blue-700 text-white p-2 ">
          <div className="col-span-8">Nombres</div>
          <div className="col-span-4">Teléfono</div>
        </div>
        <div className="bg-white p-2">
          {miembros.map((miembro, index) => (
            <GridMembresiaItem
              index={index}
              key={miembro.id}
              miembro={miembro}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
