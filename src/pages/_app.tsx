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
import { BtcProvider } from 'connection/btcconnector/context'
import 'i18n'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BtcProvider>
      <ThemeProvider defaultTheme="system" attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </BtcProvider>
  )
}
export default MyApp
