import css from './ChatBalloon.module.css'

/**
 * Displays an old office style chat balloon.
 * @param {string} [props.children] - Chat Balloon text.
 * @returns A chat balloon JSX Element.
 */
function ChatBalloon (props?: {children?: string}): JSX.Element {
  const innerText = props && props.children ? props.children : ''
    return <div className={`${css.balloon} pseudos`}>{innerText}</div>
}

export default ChatBalloon