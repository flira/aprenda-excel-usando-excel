import css from './Header.module.css'

/**
 * Creates the header background.
 * @param {string} [props.children='Aprenda Excel Usando Excel']
 * Fake window title text. 
 * @returns 
 */
function Header(props?: { children?: string }): JSX.Element {
  const innerText = props && props.children ?
    props.children : 'Aprenda Excel Usando Excel'
  return (
    <div className={`${css.header} after`}>
      <div className={`${css.row1} flex triple-bg`}>
        <span className={`${css.title} before flex`}
          data-label={innerText} />
      </div>
      <div className={`${css.row2} triple-bg`} />
      <div className={`${css.row3} flex pseudos`}></div>
    </div>
  )
}

export default Header