import { createConfig, http } from "wagmi";
import { mainnet, polygon, sepolia } from "wagmi/chains";

import Web3AuthConnectorInstance from "@/providers/web3-auth.provider";
import { coinbaseWallet, walletConnect } from "wagmi/connectors";
import { getDefaultConfig } from "connectkit";

export const config = createConfig(
  getDefaultConfig({
    appName: "ReliefNet",
    walletConnectProjectId: "3314f39613059cb687432d249f1658d2",
    chains: [mainnet, sepolia, polygon],
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
      [polygon.id]: http(),
    },
    connectors: [
      // walletConnect({
      //   projectId: "3314f39613059cb687432d249f1658d2",
      //   showQrModal: true,
      // }),
      coinbaseWallet({ appName: "wagmi" }),

      Web3AuthConnectorInstance([mainnet, sepolia, polygon]),
    ],
  })
);
