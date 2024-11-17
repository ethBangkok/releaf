"use client";

import { PrivyProvider as PProvider } from "@privy-io/react-auth";

export default function PrivyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PProvider
      appId='cm2lcuovs00ldkclfz4n2agkt'
      config={{
        appearance: {
          accentColor: "#6A6FF5",
          theme: "#FFFFFF",
          showWalletLoginFirst: false,
          logo: "https://auth.privy.io/logos/privy-logo.png",
          walletChainType: "ethereum-only",
        },
        loginMethods: ["wallet"],
        fundingMethodConfig: {
          moonpay: {
            useSandbox: true,
          },
        },
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
          requireUserPasswordOnCreate: false,
        },
        mfa: {
          noPromptOnMfaRequired: false,
        },
      }}>
      {children}
    </PProvider>
  );
}
