"use client";
import { Familia } from "@/interfaces";
import { GridFamiliaRow } from "./GridFamiliaRow";

interface Props {
  familias: Familia[];
}
export const GridFamilias = ({ familias }: Props) => {
  return (
    <div className="overflow-auto    rounded-md w-full shadow-lg">
      <div className="w-full shadow overflow-hidden rounded border-b border-gray-200">
        <div className="grid grid-cols-12 bg-blue-700 text-white p-2 ">
          <div className="col-span-8">Nombre de la Familia</div>
        </div>
        <div className="bg-white p-2">
          {familias.map((familia, index) => (
            <GridFamiliaRow index={index} key={familia.id} familia={familia} />
          ))}
        </div>
      </div>
    </div>
  );
};
