import { getEventosByIdWhithAsistencia } from "@/actions";
import { DEFAULT_QUERY_TIME } from "@/config";
import { TagsTanstack } from "@/modules/common/enum";
import { useQuery } from "@tanstack/react-query";

export const useQueryAsistencia = (eventoId: string) => {
  const eventosQuery = useQuery({
    queryKey: [TagsTanstack.EVENTOS, eventoId],
    queryFn: () => getEventosByIdWhithAsistencia(eventoId),
    staleTime: DEFAULT_QUERY_TIME, // 5 minutes
    enabled: !!eventoId,
  });

  return eventosQuery;
};
