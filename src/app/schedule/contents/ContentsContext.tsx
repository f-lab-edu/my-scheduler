"use client";

import { Priority } from "@/types/scheduleType";
import { createContext, useContext, useState, ReactNode } from "react";

type Props = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  isAddStatusVisible: boolean;
  setIsAddStatusVisible: (visible: boolean) => void;
  filterList: Priority[];
  setFilterList: (filters: Priority[]) => void;
};

const ContentsContext = createContext<Props | null>(null);

export function ContentsProvider({ children }: { children: ReactNode }) {
  const [searchValue, setSearchValue] = useState("");
  const [isAddStatusVisible, setIsAddStatusVisible] = useState(false);
  const [filterList, setFilterList] = useState<Priority[]>([]);

  return (
    <ContentsContext.Provider
      value={{
        searchValue,
        setSearchValue,
        isAddStatusVisible,
        setIsAddStatusVisible,
        filterList,
        setFilterList,
      }}
    >
      {children}
    </ContentsContext.Provider>
  );
}

export function useContentsContext() {
  const context = useContext(ContentsContext);
  if (!context)
    throw new Error("useContentsContext는 ContentsProvider 안에서 사용해야함");
  return context;
}
