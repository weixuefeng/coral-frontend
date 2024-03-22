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
import type { MetaMask } from '@web3-react/metamask'
import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'

import { hooks as metaMaskHooks, metaMask } from '../connectors/metamask'

const connectors: [MetaMask , Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
]

import { IS_RELEASE } from 'constants/setting'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider connectors={connectors}>
      <ThemeProvider defaultTheme="system" attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </Web3ReactProvider>
  )
}
export default MyApp
