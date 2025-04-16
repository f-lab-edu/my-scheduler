import type { Metadata } from "next";
import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import "./globals.css";

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

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="bg-background-startContents">
        <Header />
        {children}
        <div id="portal"></div>
      </body>
    </html>
  );
}
