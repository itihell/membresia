"use client";

import { getPaginatedPeoples } from "@/actions";
import { DEFAULT_QUERY_TIME } from "@/config";
import { TagsTanstack } from "@/modules/common/enum";
import { useQuery } from "@tanstack/react-query";

export const useQueryPeoples = () => {
  const costCenterQuery = useQuery({
    queryKey: [TagsTanstack.PEOPLE],
    queryFn: () => getPaginatedPeoples({ page: 1 }),
    staleTime: DEFAULT_QUERY_TIME,
    //enabled: costCenterId > 0,
  });

  return costCenterQuery;
};
