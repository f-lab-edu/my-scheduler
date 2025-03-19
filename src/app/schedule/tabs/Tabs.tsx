"use client";

import Tab from "./Tab";

const TabList = ["Board", "Calendar"];
export default function Tabs() {
  return (
    <div className="pt-12 pl-8 bg-background-tabs">
      {TabList.map((tab) => (
        <Tab key={tab} tab={tab} />
      ))}
    </div>
  );
}
