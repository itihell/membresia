"use client";
import { Membresia, People } from "@/interfaces";
import { useEffect, useState } from "react";
import { GridMembresiaItem } from "./GridMembresiaItem";

export const GridMembresia = () => {
  const [miembros, setMiembros] = useState<Membresia[]>([]);

  useEffect(() => {
    (async () => {
        console.log("useEffect");
        
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
          {miembros.map((miembro) => (
            <GridMembresiaItem
              key={miembro.id}
              people={miembro.persona as People}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
