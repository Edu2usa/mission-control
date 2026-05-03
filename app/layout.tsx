import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ed's AI Mission Control",
  description: "Hermes + OpenClaw architecture on Prometheus-1",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
