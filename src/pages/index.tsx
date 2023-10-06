import Head from 'next/head'
import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Clippy from '@/components/Clippy'
import ExcelGrid from '@/components/ExcelGrid'
/**
 * Avoid scaling up background images
 * more than their original size
 */
const updateResolution: () => void = () => {
  const res: number = window.devicePixelRatio > 1 ?
    window.devicePixelRatio : 1;
  (document.querySelector(':root') as HTMLElement)?.style
    .setProperty('--resolution', `${res}`)
}

/** Page Title */
const title: string = 'Aprenda Excel Usando Excel'

let caosTimer: NodeJS.Timeout
let destructionTimer: NodeJS.Timeout

export default function Home(): JSX.Element {
  useEffect(() => {
    updateResolution()
    window.addEventListener('resize', updateResolution)
  })
  const [caos, setCaos] = useState(0)
  const setCaosClass: () => string = () => {
    let currentClass: string = ''
    if (caos === 0) {
      currentClass = ''
    } else {
      currentClass = 'creu' + caos
    }
    return currentClass
  }
  const resetCaos: () => void = () => {
    setCaos(0)
    clearInterval(caosTimer)
  }
  const updateCaos: () => void = () => {
    let i:number = caos
    const setHigher: () => void = () => {
      setCaos(i++)
      if (i > 5) {
        clearInterval(caosTimer)
        return
      }
    }
    caosTimer = setInterval(setHigher, 2500);
  }
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
      <div className={setCaosClass()}>
        <main className='body-main'>
          <Header>{title}</Header>
          <ExcelGrid
            onMouseEnter={updateCaos}
            onMouseLeave={resetCaos} />
          <Footer>{title}</Footer>
        </main>
        <aside>
          <Clippy>Coeh, amizade? Bora aprender um Excelzinho?</Clippy>
        </aside>
      </div>
    </>
  )
}