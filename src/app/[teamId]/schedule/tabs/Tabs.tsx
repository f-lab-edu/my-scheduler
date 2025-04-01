"use client";

import Tab from "@/app/[teamId]/schedule/tabs/Tab";
import { useTabsContext } from "./TabsContext";

export default function Tabs() {
  const { tabList } = useTabsContext();

  return (
    <div className="pt-12 pl-[70px] bg-background-tabs">
      {tabList.map((tab) => (
        <Tab key={tab} tab={tab} />
      ))}
    </div>
  );
}
