import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import "./globals.css";
import { ReactNode } from "react";

type Props = Readonly<{
  children: ReactNode;
}>;

export const metadata: Metadata = {
  title: "Scheduler",
  description: "스케줄을 관리해보자",
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
