import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/modal";
import { PasskeysPlugin } from "@web3auth/passkeys-sfa-plugin";
import { Web3AuthOptions } from "@web3auth/single-factor-auth";

const clientId =
  "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ";

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

/**
 * Initialize Web3Auth instance.
 */
export const initializeWeb3Auth = async (): Promise<Web3Auth> => {
  try {
    const privateKeyProvider = new EthereumPrivateKeyProvider({
      config: { chainConfig },
    });

    const web3AuthOptions: Web3AuthOptions = {
      clientId,
      web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
      privateKeyProvider,
    };

    const web3auth = new Web3Auth(web3AuthOptions);

    // Configure external adapters
    const adapters = await getDefaultExternalAdapters({
      options: web3AuthOptions,
    });
    adapters.forEach((adapter) => web3auth.configureAdapter(adapter));

    return web3auth;
  } catch (error) {
    console.error("Error initializing Web3Auth:", error);
    throw new Error("Failed to initialize Web3Auth. See console for details.");
  }
};

/**
 * Initialize Passkeys Plugin and attach it to the Web3Auth instance.
 */
export const initializePasskeysPlugin = async (
  web3auth: Web3Auth
): Promise<PasskeysPlugin> => {
  try {
    const passkeysPlugin = new PasskeysPlugin({
      rpID: "your.app.xyz",
      rpName: "Your App",
    });

    // Plugin initialization is not required

    web3auth.addPlugin(passkeysPlugin);
    return passkeysPlugin;
  } catch (error) {
    console.error("Error initializing Passkeys Plugin:", error);
    throw new Error(
      "Failed to initialize Passkeys Plugin. See console for details."
    );
  }
};
