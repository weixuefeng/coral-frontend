/*
 * @Author:
 * @Date: 2022-10-12 19:08:34
 * @LastEditors:
 * @LastEditTime: 2024-01-13 21:38:52
 * @FilePath: /nextjs-webiste/src/pages/_app.tsx
 */
import 'styles/style.scss'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import 'i18n'

import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  trustWallet,
  rainbowWallet,
  okxWallet,
} from '@thirdweb-dev/react'

import { BinanceTestnet, Binance } from '@thirdweb-dev/chains'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      activeChain={BinanceTestnet}
      supportedChains={[BinanceTestnet]}
      clientId="044111f6c408b62159b7aaddf54b7c52"
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet({ recommended: true }),
        walletConnect(),
        okxWallet({ recommended: true }),
        trustWallet({ recommended: true }),
        rainbowWallet({ recommended: true }),
      ]}
    >
      <ThemeProvider defaultTheme="system" attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </ThirdwebProvider>
  )
}
export default MyApp
