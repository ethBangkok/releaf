"use client";

import { config } from "@/app/wagmi.config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider } from "connectkit";
import React, { PropsWithChildren } from "react";
import { WagmiProvider } from "wagmi";

const WagmiCustomProvider = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default WagmiCustomProvider;
