"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Props = {
  activeTab: string;
  setActiveTab: (name: string) => void;
  tabList: string[];
};

const TabsContext = createContext<Props | null>(null);

export function TabsProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState("Board");
  const tabList = ["Board", "Calendar"];

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, tabList }}>
      {children}
    </TabsContext.Provider>
  );
}

export function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context)
    throw new Error("useTabsContext는 TabsProvider 안에서 사용해야함");
  return context;
}
