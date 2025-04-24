"use client";

import Tab from "@/app/[teamId]/schedule/tabs/Tab";
import { useTabsContext } from "@/app/[teamId]/schedule/tabs/TabsContext";

export default function Tabs() {
  const { tabList } = useTabsContext();

  return (
    <div className="pt-12 pl-[70px] bg-background-tabs">
      {tabList.map((tab, index) => (
        <Tab key={`${tab}-${index}`} tab={tab} />
      ))}
    </div>
  );
}
