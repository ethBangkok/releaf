import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EthBangkok",
  description: "Developed in Eth Bangkok 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
