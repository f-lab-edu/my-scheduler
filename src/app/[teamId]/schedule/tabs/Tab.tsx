import { useRouter, useParams } from "next/navigation";
import clsx from "clsx";
import { useTabsContext } from "@/app/[teamId]/schedule/tabs/TabsContext";
import { useEffect } from "react";

type Props = {
  tab: string;
};

export default function Tab({ tab }: Props) {
  const { activeTab, setActiveTab } = useTabsContext();
  const router = useRouter();
  const params = useParams();

  const handleTabClick = () => {
    setActiveTab(tab);
    router.push(`/${params.teamId}/schedule/${tab.toLowerCase()}`);
  };

  const isActive = activeTab.toLowerCase() === tab.toLowerCase();
  return (
    <button
      className={clsx(
        "text-[20px] mr-[32px]",
        isActive
          ? "text-white border-b-[3px] border-border-activeTab"
          : "text-tabs"
      )}
      onClick={handleTabClick}
    >
      {tab}
    </button>
  );
}
