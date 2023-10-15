import { Dispatch, useEffect, useState } from 'react'
import { useCaos, useCaosDispatcher } from '@/hooks/CaosContext'
import css from './PageTitle.module.css'

function PageTitle(): JSX.Element {
  const caos = useCaos()
  const caosDispatcher = useCaosDispatcher()
  const onMouseDown: () => void = () => {
    if (caos.value === caos.max) {
      caosDispatcher('reset')
      return
    }
    caosDispatcher('increment')
  }

  /**
   * The text-shadow on the wordart1 works correctly on
   * most browsers, except safari. I didn't want to remove
   * it completely for every browser, so this state removes
   * only on apple devices.
   */
  const [isMac, setIsMac] = useState(false)
  useEffect(() => {
    if (typeof navigator === 'undefined' ||
      !/apple/i.test((navigator as Navigator).userAgent)) {
      return
    }
    setIsMac(true);
  }, [false])
  return (
    <h1
      className={css.title}
      onClick={onMouseDown}>
      <div className={css.line1}>
        <span className={css.intro1}>Aprenda</span> 
        <span className={`${css.wordart1} ${isMac ? css.noshadow : ''} ${css.shadow}`}>Excel</span> 
      </div>
      <div className={css.line2}>
        <span className={css.intro2}>
          <span className={css.rail}>{splitText('usando')}</span>
        </span> 
        <span className={`${css.wordart2} ${css.shadow}`}>Excel</span>
      </div>
    </h1>
  )
}

function splitText(text: string): JSX.Element[] {
  const textMap: (value: string, i: number, arr: string[]) => JSX.Element =
    (value, i, arr) => (
      <span
        className={css.wagon}
        key={`wagon-key-${i}`}
        style={
          {
            animationDelay:
              `calc(${i * (arr.length * .025)} * var(--animation-duration))`
          }}>
        {value}
      </span>
    )
  return text.split('').map(textMap)
}

export default PageTitle