import type { Metadata } from "next";
import "./globals.css";

const githubPagesBasePath = process.env.GITHUB_PAGES_BASE_PATH ?? "/road-bridge";
const publicBasePath = process.env.GITHUB_PAGES === "true" ? githubPagesBasePath : "";
const faviconPath = `${publicBasePath}/favicon.svg`;

export const metadata: Metadata = {
  title: "路桥资产地图",
  description: "按地图浏览路桥收费权资产、归属公司和运营信息。",
  icons: {
    icon: faviconPath,
    shortcut: faviconPath,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
