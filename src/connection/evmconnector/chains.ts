import type { AddEthereumChainParameter } from "@web3-react/types";

const OPBNB: AddEthereumChainParameter["nativeCurrency"] = {
  name: "OPBNB",
  symbol: "BNB",
  decimals: 18,
};

interface BasicChainInformation {
  urls: string[];
  name: string;
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter["nativeCurrency"];
  blockExplorerUrls: AddEthereumChainParameter["blockExplorerUrls"];
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation,
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency;
}

export function getAddChainParameters(
  chainId: number,
): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId];
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    };
  } else {
    return chainId;
  }
}

const getInfuraUrlFor = (network: string) =>
  process.env.infuraKey
    ? `https://${network}.infura.io/v3/${process.env.infuraKey}`
    : undefined;
const getAlchemyUrlFor = (network: string) =>
  process.env.alchemyKey
    ? `https://${network}.alchemyapi.io/v2/${process.env.alchemyKey}`
    : undefined;

type ChainConfig = {
  [chainId: number]: BasicChainInformation | ExtendedChainInformation;
};

export const MAINNET_CHAINS: ChainConfig = {
  204: {
    urls: ["https://opbnb-mainnet-rpc.bnbchain.org"].filter(Boolean),
    name: "OPBNB",
    nativeCurrency: OPBNB,
    blockExplorerUrls: ["http://opbnbscan.com/"],
  },
};

// unused for testnet
export const TESTNET_CHAINS: ChainConfig = {
  5: {
    urls: [getInfuraUrlFor("goerli")].filter(Boolean),
    name: "Görli",
  },
  420: {
    urls: [
      getInfuraUrlFor("optimism-goerli"),
      "https://goerli.optimism.io",
    ].filter(Boolean),
    name: "OPBNB TSETNET",
    nativeCurrency: OPBNB,
    blockExplorerUrls: ["https://goerli-explorer.optimism.io"],
  },
};

export const CHAINS: ChainConfig = {
  ...MAINNET_CHAINS,
  //   ...TESTNET_CHAINS,
};

export const URLS: { [chainId: number]: string[] } = Object.keys(
  CHAINS,
).reduce<{ [chainId: number]: string[] }>((accumulator, chainId) => {
  const validURLs: string[] = CHAINS[Number(chainId)].urls;

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs;
  }

  return accumulator;
}, {});
