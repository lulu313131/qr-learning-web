import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "部門學習網",
  description: "QR Learning — 部門技能學習與組織架構平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" className="h-full antialiased">
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
