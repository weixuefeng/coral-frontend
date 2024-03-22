import type { AddEthereumChainParameter } from '@web3-react/types'

const BNB: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Binance Smart Chain',
  symbol: 'BNB',
  decimals: 18,
}

interface BasicChainInformation {
  urls: string[]
  name: string
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter['nativeCurrency']
  blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls']
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency
}

export function getAddChainParameters(chainId: number): AddEthereumChainParameter | number {
  console.log('chainid', chainId)
  const chainInformation = CHAINS[chainId]
  console.log('info', chainInformation)
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    }
  } else {
    return chainId
  }
}

type ChainConfig = { [chainId: number]: BasicChainInformation | ExtendedChainInformation }

export const MAINNET_CHAINS: ChainConfig = {
  56: {
    urls: ['https://bsc-dataseed2.binance.org/'],
    name: 'Mainnet',
  },
  97: {
    urls: ['https://data-seed-prebsc-2-s2.bnbchain.org:8545'],
    name: 'testnet',
  },
}

export const CHAINS: ChainConfig = {
  ...MAINNET_CHAINS,
}

export const URLS: { [chainId: number]: string[] } = Object.keys(CHAINS).reduce<{ [chainId: number]: string[] }>(
  (accumulator, chainId) => {
    const validURLs: string[] = CHAINS[Number(chainId)].urls
    if (validURLs.length) {
      accumulator[Number(chainId)] = validURLs
    }
    return accumulator
  },
  {}
)
