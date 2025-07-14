"use client";

import { deleteMiembroHasFamilia, getFamiliaById } from "@/actions";
import { titleFont } from "@/config/fonts";
import { Familia } from "@/interfaces";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";

interface Props {
  familiaId: string;
  onDeleted?: (id: string) => void;
}
export const MiembrosHasFamilia = ({ familiaId, onDeleted }: Props) => {
  const route = useRouter();
  const [familia, setFamilia] = useState<Familia>({} as Familia);

  useEffect(() => {
    (async () => {
      const familia = await getFamiliaById(familiaId);
      setFamilia(familia);
    })();
  }, [familiaId]);

  const onDeletedMiembro = async (id: string) => {
    await deleteMiembroHasFamilia(id);

    if (onDeleted) {
      onDeleted(id);
    }

    const familia = await getFamiliaById(familiaId);
    setFamilia(familia);
  };

  const goToPersona = (id: string) => {
    route.push(`/personas/${id}`);
  };
  return (
    <div className="w-full">
      <div className="flex gap-4 items-center">
        <div>Familia</div>
        <div className={`${titleFont.className} text-2xl font-bold`}>
          {familia.name}
        </div>
      </div>
      <div className="mt-4">
        {familia.miembros?.map((miembro) => (
          <div
            key={miembro.id}
            className="grid grid-cols-3 gap-4 border-b p-2 border-b-blue-100"
          >
            <div
              className="cursor-pointer hover:text-blue-500"
              onClick={() => {
                goToPersona(miembro.persona?.id as string);
              }}
            >{`${miembro.persona?.nombres} ${miembro.persona?.apellidos}`}</div>
            <div className="">{`${miembro.parentesco?.parentesco} `}</div>
            <div>
              <button
                className="text-red-700 hover:text-red-500"
                onClick={() => {
                  onDeletedMiembro(miembro.id as string);
                }}
              >
                <FaTrash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
