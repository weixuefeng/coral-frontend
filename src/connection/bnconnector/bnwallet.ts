import { WalletConfig } from '@thirdweb-dev/react'
import { BinanceWallet } from './interface';
import { isInBinance } from '@binance/w3w-utils'
export type BinanceWalletConfigOptions = {
    /**
     * When connecting OKX using the QR Code - Wallet Connect connector is used which requires a project id.
     * This project id is Your project’s unique identifier for wallet connect that can be obtained at cloud.walletconnect.com.
     *
     * https://docs.walletconnect.com/2.0/web3modal/options#projectid-required
     */
    projectId?: string;
  
    /**
     * If true, the wallet will be tagged as "recommended" in ConnectWallet Modal
     */
    recommended?: boolean;
  };

export function binanceWallet (options?: BinanceWalletConfigOptions): WalletConfig<BinanceWallet> {
  return {
    id: 'Binance-wallet',
    meta: {
      name: "Binance Wallet",
      iconURL: "ipfs://QmcxZHpyJa8T4i63xqjPYrZ6tKrt55tZJpbXcjSDKuKaf9/binance-coin/512.png", // or ipfs://...
      // optional
      urls: {
        chrome: "https://www.binance.com/en/web3wallet",
        firefox: "https://www.binance.com/en/web3wallet",
        android: "https://www.binance.com/en/web3wallet",
        ios: "https://www.binance.com/en/web3wallet",
      },
    },
    // create and return wallet instance
    create(walletOptions) {
      return new BinanceWallet(walletOptions)
    },
    recommended: true,
    isInstalled: () => isInBinance()
  };
};
