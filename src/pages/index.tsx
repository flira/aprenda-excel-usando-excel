import { useCaos } from '@/hooks/CaosContext'
import useScreenResolution from '@/hooks/useScreenResolution'
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Clippy from '@/components/Clippy'
import ExcelGrid from '@/components/ExcelGrid'

export default function Home(): JSX.Element {
  const caos = useCaos()
  const caosClassName: () => string = () => {
    if (!caos.value) {
      return ''
    } else if (caos.value === caos.max) {
      return `creu${caos.value - 1} self-destruction`
    } else {
      return `creu${caos.value}`
    }
  }
  useScreenResolution()

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
      <div className={caosClassName()}>
        <main className='body-main'>
          <Header>{title}</Header>
          <ExcelGrid />
          <Footer>{title}</Footer>
        </main>
        <aside>
          <Clippy>Coeh, amizade? Bora aprender um Excelzinho?</Clippy>
        </aside>
      </div>
    </>
  )
}

/** Page Title */
const title: string = 'Aprenda Excel Usando Excel'