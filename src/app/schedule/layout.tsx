import { ReactNode } from "react";
import Tabs from "./tabs/Tabs";
import { TabsProvider } from "./tabs/TabsContext";

type Props = { children: ReactNode };

export default function ScheduleLayout({ children }: Props) {
  return (
    <TabsProvider>
      <Tabs />
      <div>hjkhjk</div>
      <main>{children}</main>
    </TabsProvider>
  );
}
