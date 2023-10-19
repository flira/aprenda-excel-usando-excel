import { Dispatch, useEffect, useState } from 'react'
import { Entropy, useEntropy, useEntropyDispatcher } from '@/hooks/entropyContext'
import Image, { StaticImageData } from 'next/image'
import ImgDefault from './img/animation.gif'
import ImgCaos from './img/clippy-search.gif'
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
  const entropyDispatcher = useEntropyDispatcher()

  const reset: () => void = () => {
    entropyDispatcher('reset')
  }

  useEffect(() => {
    if (entropy.value === entropy.max) {
      const speech: JSX.Element = entropy.refresh ?
        <div><p>Caraca, mané! Nem recarregar rolou!</p><p>Vai ter que ser por esse <button onClick={reset}>botão</button> mesmo.</p></div> :
        <div>Putz, deu ruim. <button onClick={reset}>Clica aqui</button> para arrumar a parada.</div>
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

export default Clippy