import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Resilio — Emergency Energy Planner",
  description:
    "Plan and study small emergency solar and battery systems with safety-first guidance.",
  other: {
    "codex-preview": "development",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
