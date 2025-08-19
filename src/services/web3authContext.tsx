import {
  AccountAbstractionProvider,
  SafeSmartAccount,
} from "@web3auth/account-abstraction-provider";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { WEB3AUTH_NETWORK } from "@web3auth/modal";
import { type Web3AuthContextConfig } from "@web3auth/modal/react";

const pimlicoAPIKey = import.meta.env.VITE_PIMLICO_KEY

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.sepolia.org",
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const chainId = 11155111

const accountAbstractionProvider = new AccountAbstractionProvider({
  config: {
    chainConfig,
    bundlerConfig: {
      // Get the pimlico API Key from dashboard.pimlico.io
      url: `https://api.pimlico.io/v2/${chainId}/rpc?apikey=${pimlicoAPIKey}`,
    },
    smartAccountInit: new SafeSmartAccount(),
    paymasterConfig: {
      // Get the pimlico API Key from dashboard.pimlico.io
      url: `https://api.pimlico.io/v2/${chainId}/rpc?apikey=${pimlicoAPIKey}`,
    },
  },
});

const web3AuthContextConfig: Web3AuthContextConfig = {
  web3AuthOptions: {
    clientId: import.meta.env.VITE_CLIENT_ID,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    // privateKeyProvider: new EthereumPrivateKeyProvider({
    //   // Use the chain config we declared earlier
    //   config: { chainConfig },
    // }),
    // accountAbstractionProvider,
    // useAAWithExternalWallet: false,
    uiConfig: {
      logoDark: "react.svg",
      logoLight: "react.svg"
    }
  },
};

export default web3AuthContextConfig;