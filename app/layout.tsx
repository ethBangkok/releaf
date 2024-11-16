import type { Metadata } from "next";
import "./globals.css";
import WagmiCustomProvider from "@/providers/wagmi-provider";

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
    <html lang='en'>
      <WagmiCustomProvider>
        <body>{children}</body>
      </WagmiCustomProvider>
    </html>
  );
}
