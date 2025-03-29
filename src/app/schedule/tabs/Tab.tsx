import clsx from "clsx";
import { useTabsContext } from "@/app/schedule/tabs/TabsContext";

type Props = {
  tab: string;
};

export default function Tab({ tab }: Props) {
  const { activeTab, setActiveTab } = useTabsContext();

  return (
    <button
      className={clsx(
        "text-[20px] mr-[32px]",
        activeTab === tab
          ? "text-white border-b-[3px] border-border-activeTab"
          : "text-tabs"
      )}
      onClick={() => setActiveTab(tab)}
    >
      {tab}
    </button>
  );
}
