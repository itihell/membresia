import type { Membresia } from "@/interfaces";
import { format } from "date-fns";
import Link from "next/link";
import { FaPencil, FaPlus } from "react-icons/fa6";

interface Props {
  membresias?: Membresia[];
  id?: string;
}
const DataMembresia = ({ id, membresias }: Props) => {
  return (
    <div>
      <div className="mb-3">
        <div>
          {id && (
            <Link
              href={`/membresias/add?tab=membresia&persona=${id}`}
              className="text-blue-700 hover:text-blue-500 flex gap-1 items-center"
            >
              <FaPlus size={15} /> Agregar
            </Link>
          )}
        </div>
      </div>
      {membresias?.map(membresia => (
        <div key={membresia.id}>
          <div className="flex gap-4">
            <div className="font-bold">Fecha:</div>
            <div>{format(membresia.fecha, "dd - MM -yyyy")}</div>
          </div>
          <div className="flex gap-4">
            <div className="font-bold">Tipo:</div>
            <div>{membresia.tipoMembresia?.tipo_mebresia}</div>
          </div>
          <div className="flex gap-4 mt-5">
            <div>
              <Link
                href={`/membresias/edit/${membresia.id}?tab=membresia`}
                className="text-blue-700 hover:text-blue-500 flex gap-1 items-center"
              >
                <FaPencil size={15} /> Editar
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export { DataMembresia };
