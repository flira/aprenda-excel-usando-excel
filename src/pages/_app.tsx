import type { AppProps } from 'next/app'
import { ScreenSizeProvider } from '@/hooks/ScreenSizeContext'
import { EntropyProvider } from '@/hooks/entropyContext'
import 'modern-normalize/modern-normalize.css'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EntropyProvider>
      <ScreenSizeProvider>
        <Component {...pageProps} />
      </ScreenSizeProvider>
    </EntropyProvider>
  )
}
