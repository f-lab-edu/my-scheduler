import type { Metadata } from "next";
import Header from "@/components/common/Header";
import "./globals.css";

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
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
