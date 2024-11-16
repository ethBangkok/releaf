import { createConfig, http } from "wagmi";
import { polygon, sepolia } from "wagmi/chains";

import { getDefaultConfig } from "connectkit";
import { injected } from "wagmi/connectors";

export const config = createConfig(
  getDefaultConfig({
    appName: "ReliefNet",
    walletConnectProjectId: "3314f39613059cb687432d249f1658d2",
    chains: [sepolia, polygon],

    transports: {
      [sepolia.id]: http(),
      [polygon.id]: http(),
    },
    connectors: [
      injected(),
      // walletConnect({
      //   projectId: "3314f39613059cb687432d249f1658d2",
      //   showQrModal: true,
      // }),
      // coinbaseWallet({ appName: "wagmi" }),

      // Web3AuthConnectorInstance([mainnet, sepolia, polygon]),
    ],
  })
);
