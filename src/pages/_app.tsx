import type { AppProps } from 'next/app'
import { ScreenSizeProvider } from '@/hooks/ScreenSizeContext'
import 'modern-normalize/modern-normalize.css'
import '@/styles/globals.css'
import { CaosProvider } from '@/hooks/CaosContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CaosProvider>
      <ScreenSizeProvider>
        <Component {...pageProps} />
      </ScreenSizeProvider>
    </CaosProvider>
  )
}
