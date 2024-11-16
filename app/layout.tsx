import type { Metadata } from "next";
import "./globals.css";
import WagmiCustomProvider from "@/providers/wagmi-provider";
import { SubgraphProvider } from "@/providers/subgraph-provider";
import { Client, cacheExchange, fetchExchange } from '@urql/core';


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
        subgraphClient={
          new Client({
            url: 'https://api.thegraph.com/subgraphs/name/ethbangkok/ethbangkok',
            exchanges: [cacheExchange, fetchExchange]
          })
        }
        >
        <body>{children}</body>
        </SubgraphProvider>
      </WagmiCustomProvider>
    </html>
  );
}
