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
function Clippy(): JSX.Element {
  const entropy: Entropy = useEntropy()
  const initialState: ClippyState = entropy.refresh ?
    clippyStates({...entropy, value: 0}) : clippyStates(entropy)
  const [clippy, setClippy] = useState(initialState)

  useEffect(() => { setClippy(clippyStates(entropy)) }, [entropy])

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

function clippyStates(entropy: Entropy): ClippyState {
  const controller: JSX.Element = (
    <div>
      <div className={css.speed}>
        <EntropyBtn value='decrement'>-</EntropyBtn>
        <EntropyBtn value={entropy.value !== entropy.max - 1 ? 'increment' : 'destroy'}>+</EntropyBtn>
      </div>
      <EntropyBtn value='reset'>reset</EntropyBtn>
    </div>
  )
  switch (entropy.value) {
    case 0:
      return {
        image: ImgDefault,
        speech: <div><p>Coeh, amizade? Bora aprender um Excelzinho?</p></div>
      }
    case 1:
      return {
        image: ImgSpeed1,
        speech: <div><p>Opa. Tá querendo ir fundo nos estudos?</p><p>Que tal uma pá?</p>{controller}</div>
      }
    case 2:
      return {
        image: ImgSpeed2,
        speech: <div><p>Talvez um pouco mais rápido?</p>{controller}</div>
      }
    case 3:
      return {
        image: ImgSpeed3,
        speech: <div><p>Mais rápido?</p>{controller}</div>
      }
    case 4:
      return {
        image: ImgSpeed4,
        speech: <div><p>Ihuuuuu!</p>{controller}</div>
      }
    case 5:
      return {
        image: ImgSpeed5,
        speech: <div><p>AFULEPAAAAA!!!11UM</p>{controller}</div>
      }
    case 6:
      const speech: JSX.Element = entropy.refresh ?
        (<div>
          <p>É, recarregar não rolou :-(</p>
          <p><EntropyBtn value={'reset'}>Clique aqui</EntropyBtn>, talvez?</p>
        </div>) :
        (<div>
          <p>Putz, deu ruim.</p>
          <p><EntropyBtn value={'reset'}>Clica aqui</EntropyBtn> para arrumar a parada.</p>
        </div>)
      return {
        image: ImgCaos,
        speech: speech
      }
  }
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