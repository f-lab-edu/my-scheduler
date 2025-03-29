import { ReactNode } from "react";
import { TabsProvider } from "@/app/schedule/tabs/TabsContext";

type Props = { children: ReactNode };

export default function ScheduleLayout({ children }: Props) {
  return (
    <TabsProvider>
      <main>{children}</main>
    </TabsProvider>
  );
}
