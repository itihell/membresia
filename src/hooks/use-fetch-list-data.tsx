"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { KeyboardEvent, useEffect, useRef } from "react";
import { getListSexos } from "@/actions";

type BoleanOrUndefined = boolean | undefined;
interface State<T> {
  items: T[];
  open: boolean | undefined;
  setItems: (items: T[]) => void;
  setOpen: (open: boolean) => void;
}
interface Props<T> {
  getData: (search: string) => T[];
  keyStore: string;
}

const useListFetchData = <T,>(
  getData: (search: string) => Promise<T[]>,
  keyStore: string
) => {
  const hasFetchedData = useRef(false);
  const store = create<State<T>>()(
    persist(
      (set, get) => ({
        items: [] as T[],
        open: false,
        setItems: (items: T[]) => set({ items }),
        setOpen: (open: BoleanOrUndefined) => set({ open }),
      }),
      {
        name: keyStore,
      }
    )
  );

  const setItems = store((state) => state.setItems);

  const fetchData = async (search: string = "") => {
    const rows = await getData(search);
    return rows;
  };

  useEffect(() => {
    if (!hasFetchedData.current) {
      (async () => {
        const data = await getData("");
        setItems(data as T[]);
        hasFetchedData.current = true;
      })();
    }
  }, [getData, setItems]);

  //e: KeyboardEvent<HTMLInputElement>
  // e.currentTarget.value;
  const searchData = async (e?: string) => {
    const search = e;
    const data = await fetchData(search);
    setItems(data as T[]);
  };

  const removeTilde = (str: string) => {
    if (str) {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    return str;
  };

  return {
    searchData,
    removeTilde,
    store,
  };
};

export { useListFetchData };
