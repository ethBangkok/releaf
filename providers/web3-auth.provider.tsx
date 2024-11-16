import { Web3Auth } from "@web3auth/single-factor-auth";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { PasskeysPlugin } from "@web3auth/passkeys-sfa-plugin";

const provider = new EthereumPrivateKeyProvider({ config: { chainConfig } });

const web3auth = new Web3Auth({
  clientId: "YOUR_CLIENT_ID",
  web3AuthNetwork: "sapphire_mainnet",
  privateKeyProvider: provider,
});

const passkeysPlugin = new PasskeysPlugin({
  rpID: "your.app.xyz",
  rpName: "Your App",
});

web3auth.addPlugin(passkeysPlugin);

web3auth.init();
