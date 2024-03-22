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
import { IS_RELEASE } from 'constants/setting'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      activeChain={IS_RELEASE ? Binance : BinanceTestnet}
      supportedChains={[IS_RELEASE ? Binance : BinanceTestnet]}
      clientId="d89bd7e02c56119887c603be6eaf6df0"
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
