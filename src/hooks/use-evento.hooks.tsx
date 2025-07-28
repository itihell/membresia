"use client";
import type { countAsistencia, EventoHasAsistencia } from "@/interfaces";

export const useEvento = () => {
  const groupAsistenciaBySex = (events: EventoHasAsistencia[]) => {
    return events.reduce(
      (acc, row) => {
        if (row.persona?.sexo_id === 1 && row.asistio) {
          acc.hombres += 1;
        }
        if (row.persona?.sexo_id === 2 && row.asistio) {
          acc.mujeres += 1;
        }

        return acc;
      },
      { hombres: 0, mujeres: 0, total: 0 } as countAsistencia
    );
  };
  return {
    groupAsistenciaBySex,
  };
};
