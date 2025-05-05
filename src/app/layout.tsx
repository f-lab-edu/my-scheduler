import type { Metadata } from "next";
import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import "./globals.css";
import { getSessionUid } from "@/lib/server/auth";

type Props = Readonly<{
  children: ReactNode;
}>;

export const metadata: Metadata = {
  title: "Scheduler",
  description: "스케줄을 관리해보자",
  icons: {
    icon: "/favicon.png",
  },
};

export default async function RootLayout({ children }: Props) {
  const uid = await getSessionUid();
  return (
    <html lang="en">
      <body className="bg-background-startContents">
        <Header uid={uid} />
        {children}
        <div id="portal"></div>
      </body>
    </html>
  );
}
