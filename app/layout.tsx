import { Toaster } from "@/components/ui/toaster";
import { SubgraphProvider } from "@/providers/subgraph-provider";
import WagmiCustomProvider from "@/providers/wagmi-provider";
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
    <html lang='en'>
      <WagmiCustomProvider>
        <SubgraphProvider
        // subgraphClient={
        //   new Client({
        //     url: 'https://api.studio.thegraph.com/query/42205/eth-bangkok/version/latest',
        //     exchanges: [cacheExchange, fetchExchange]
        //   })
        // }
        >
          <body>{children}</body>
          <Toaster />
        </SubgraphProvider>
      </WagmiCustomProvider>
    </html>
  );
}
