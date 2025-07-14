"use client";

import debounce from "lodash.debounce";

import { DEFAULT_QUERY_CATALOGS_TIME } from "@/config/queries";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";

const useListData = <T,>(
  getData: (search: string) => Promise<T[]>,
  keyStore: string
) => {
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, isFetching } = useQuery<T[]>({
    queryKey: [keyStore, search],
    queryFn: () => getData(search),
    staleTime: DEFAULT_QUERY_CATALOGS_TIME,
  });

  const searchData = (value: string) => {
    setSearch(value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(debounce(searchData, 700), []);

  return {
    items: data ?? [],
    isLoading,
    isError,
    isFetching,
    searchData: debouncedSearch,
  };
};

export { useListData };
