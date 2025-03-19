import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import "./globals.css";
import Tabs from "@/components/layout/Tabs";

export const metadata: Metadata = {
  title: "Scheduler",
  description: "스케줄을 관리해보자",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background-startContents">
        <Header />
        <Tabs />
        {children}
      </body>
    </html>
  );
}
