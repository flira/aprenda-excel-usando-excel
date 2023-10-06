import css from './Footer.module.css'

/**
 * Creates the footer background.
 * @param {string} [props.children='Aprenda Excel Usando Excel']
 * Fake tab title text. 
 * @returns 
 */
function Footer(props?: { children?: string }): JSX.Element {
  const innerText = props && props.children ?
    props.children : 'Aprenda Excel Usando Excel'
  return (
    <div className={`${css.footer} after`}>
      <div className={`${css.tabs} after flex`}>
        <div className={`${css.tab} triple-bg`} data-label={innerText} />
      </div>
    </div>
  )
}

export default Footer