import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dynamic Interface Compiler",
  description: "Dynamic Interface Compiler (DIC) is a tool for creating dynamic interfaces based on user-defined schemas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
