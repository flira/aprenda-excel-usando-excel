import { useEffect, useState } from 'react'
import { useEntropy } from '@/hooks/entropyContext'
import useScreenResolution from '@/hooks/useScreenResolution'
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Clippy from '@/components/Clippy'
import ExcelGrid from '@/components/ExcelGrid'

export default function Home(): JSX.Element {
  useScreenResolution()
  const entropy = useEntropy()
  const [entropyCssClass, setCssEntropyClass] = useState('')

  function entropyClassName() {
    if (!entropy.value) {
      setCssEntropyClass('')
      return
    } else if (entropy.value === entropy.max) {
      setCssEntropyClass(`creu${entropy.value - 1} self-destruction`)
      return
    } else {
      setCssEntropyClass(`creu${entropy.value}`)
      return
    }
  }

  useEffect(entropyClassName, [entropy])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Baixe o arquivo excel ensinando a usar excel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={entropyCssClass}>
        <main className='body-main'>
          <Header>{title}</Header>
          <ExcelGrid />
          <Footer>{title}</Footer>
        </main>
        <aside>
          <Clippy />
        </aside>
      </div>
    </>
  )
}

/** Page Title */
const title: string = 'Aprenda Excel Usando Excel'