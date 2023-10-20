import { Dispatch, useEffect, useState } from 'react'
import { Entropy, entropyReducerActions, useEntropy, useEntropyDispatcher } from '@/hooks/entropyContext'
import Image, { StaticImageData } from 'next/image'
import ImgDefault from './img/clippy-knock.gif'
import ImgSpeed1 from './img/clippy-speed1.gif'
import ImgSpeed2 from './img/clippy-speed2.gif'
import ImgSpeed3 from './img/clippy-speed3.gif'
import ImgSpeed4 from './img/clippy-speed4.gif'
import ImgSpeed5 from './img/clippy-speed5.gif'
import ImgCaos from './img/clippy-search-edit.gif'
import css from './Clippy.module.css'
import ChatBalloon from '../ChatBalloon'

type ClippyState = {
  speech: string | JSX.Element,
  image: StaticImageData
}

/**
 * Displays Clippy window.
 * @param {string} [props.children] - Chat Balloon text.
 * @returns Clippy JSX Element.
 */
function Clippy({ children }: { children?: JSX.Element | string }): JSX.Element {
  const initialState: ClippyState = {
    image: ImgDefault,
    speech: children ? children : ''
  }
  const [clippy, setClippy] = useState(initialState)
  const entropy: Entropy = useEntropy()

  useEffect(() => {
    const controller: JSX.Element = (
      <div>
        <div className={css.speed}>
          <EntropyBtn value='decrement'>-</EntropyBtn>
          <EntropyBtn value='increment'>+</EntropyBtn>
        </div>
        <EntropyBtn value='reset'>reset</EntropyBtn>
      </div>
    )
    switch (entropy.value) {
      case 0:
        setClippy(initialState)
        break
      case 1:
        setClippy({
          image: ImgSpeed1,
          speech: <div><p>Opa. Bora pro fundo do poço?</p>{controller}</div>
        })
        break
      case 2:
        setClippy({
          image: ImgSpeed2,
          speech: <div><p>Talvez um pouco mais rápido?</p>{controller}</div>
        })
        break
      case 3:
        setClippy({
          image: ImgSpeed3,
          speech: <div><p>Mais rápido?</p>{controller}</div>
        })
        break
      case 4:
        setClippy({
          image: ImgSpeed4,
          speech: <div><p>Ihuuuuu!</p>{controller}</div>
        })
        break
      case 5:
        setClippy({
          image: ImgSpeed5,
          speech: <div><p>AFULEPAAAAA!!!11UM</p>{controller}</div>
        })
        break
      case 6:
        const speech: JSX.Element = entropy.refresh ?
          (<div>
            <p>É, recarregar não rolou :-(</p>
            <p><EntropyBtn value={'reset'}>Clique aqui</EntropyBtn>, talvez?</p>
          </div>) :
          (<div>
            Putz, deu ruim. <EntropyBtn value={'reset'}>Clica aqui</EntropyBtn> para arrumar a parada.
          </div>)
        setClippy({
          image: ImgCaos,
          speech: speech
        })
    }
  }, [entropy])

  return (
    <div>
      <div className={css.window}>
        <ChatBalloon>{clippy.speech}</ChatBalloon>
        <Image
          alt="Gif animado do Clippy"
          src={clippy.image}
          style={{
            height: 'calc(224px / var(--resolution))',
            width: 'calc(224px / var(--resolution))'
          }} />
      </div>
    </div>
  )
}

function EntropyBtn(
  { value, children }: { value: entropyReducerActions, children: string }
): JSX.Element {
  const entropyDispatcher: Dispatch<entropyReducerActions> =
    useEntropyDispatcher()
  const onClick: () => void = () => {
    entropyDispatcher(value)
  }
  return (
    <button onClick={onClick}>
      {children}
    </button>
  )
}

export default Clippy