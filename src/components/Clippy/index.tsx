import Image from 'next/image'
import clippyImg from './img/animation.gif'
import css from './Clippy.module.css'
import ChatBalloon from '../ChatBalloon'

/**
 * Displays Clippy window.
 * @param {string} [props.children] - Chat Balloon text.
 * @returns Clippy JSX Element.
 */
function Clippy(props?: { children?: string }): JSX.Element {
  return (
    <div>
      <div className={css.window}>
        <ChatBalloon>{props?.children}</ChatBalloon>
        <Image
          alt="Gif animado do Clippy"
          src={clippyImg}
          style={{
            height: 'calc(224px / var(--resolution))',
            width: 'calc(224px / var(--resolution))'
          }} />
      </div>
    </div>
  )
}

export default Clippy