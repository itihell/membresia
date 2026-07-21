import { getEventosConAsistencia } from "@/actions";
import { DEFAULT_QUERY_TIME } from "@/config";
import { TagsTanstack } from "@/modules/common/enum";
import { useQuery } from "@tanstack/react-query";

export const useQueryEventosAsistencia = () => {
  return useQuery({
    queryKey: [TagsTanstack.EVENTOS, "lista-asistencias"],
    queryFn: () => getEventosConAsistencia(),
    staleTime: DEFAULT_QUERY_TIME,
  });
};
