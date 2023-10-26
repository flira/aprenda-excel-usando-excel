import { CSSProperties, LegacyRef, useEffect, useRef, useState } from 'react'
import { Entropy, useEntropy } from '@/hooks/entropyContext'
import DownloadButton from '../DownloadButton'
import PageTitle from '../PageTitle'
import css from './ExcelGrid.module.css'
import json from './paragraphs.json'

const { cols, rows } = {
  cols: 4,
  rows: json.paragraphs.length + 4
}

function ExcelGrid(): JSX.Element {
  const entropy: Entropy = useEntropy()
  const contentMap: Map<string, JSX.Element> = new Map()
  contentMap
    .set('A1', <PageTitle />)
    .set(`B${json.paragraphs.length + 2}`, <DownloadButton />)
    .set(`B${json.paragraphs.length + 3}`, (
      <small>
        <p>Microsoft Excel<sup>®</sup> e Clippy são propriedades intelectuais da Microsoft.<br />Este site não possui nenhuma relação com a empresa.</p>
      </small>
    ))

  json.paragraphs.forEach((p: string, i: number) => {
    const cell: string = 'B' + (2 + i)
    contentMap.set(cell, <p>{p}</p>)
  })

  const setDestruction: () => boolean = () => entropy.value === entropy.max
  const wrapperStyle: CSSProperties = {
    gridTemplateRows: `calc(16px / var(--resolution)) auto repeat(${rows - 4}, min-content) auto min-content`
  }

  return (
    <div className={`${css.main} pseudos flex`}>
      <article className={css.content} style={wrapperStyle}>
        {buildFirstRow(setDestruction())}
        {buildRows(setDestruction(), contentMap)}
      </article>
    </div>
  );
}

type CellElement = {
  row: number,
  selfDestruction: boolean,
  children?: JSX.Element,
  className?: string,
  cellId?: string,
  label?: string,
}

function Cell({
  row,
  selfDestruction,
  children,
  className = css.cell,
  cellId = '',
  label = '' }: CellElement): JSX.Element {
  const ref: LegacyRef<HTMLDivElement> = useRef(null)
  const initialStyle: CSSProperties = {}
  const [style, setStyle] = useState(initialStyle);
  const randomDeg: () => string = () => (
    !!Math.round(Math.random()) ? '-' : ''
  ) + Math.round(Math.random() * 45) + 'deg'

  const fall: () => number = () => {
    if (!ref.current || !ref.current.parentElement) {
      return 0
    }
    const $: HTMLDivElement = ref.current
    return ($.parentElement as HTMLElement).offsetHeight -
      $.offsetTop - $.offsetHeight
  }

  const updateStyle: () => void = () => {
    setStyle({
      ...style,
      transform: !selfDestruction ? '' : `rotate(${randomDeg()}) translateY(${fall()}px)`,
      filter: !selfDestruction ? '' : `blur(${(rows - (row + 1)) / 1.5}px)`,
      transitionDelay: `${Math.round(Math.random() * 350)}ms`,
    })
  }

  useEffect(() => {
    updateStyle()
    window.addEventListener('resize', updateStyle)
    return () => {
      window.removeEventListener('resize', updateStyle)
    }
  }, [false])

  return (
    <div
      className={className}
      data-label={label}
      id={css[cellId]}
      style={style}
      ref={ref}>
      {children}
    </div>
  )
}

function numToLetter(n: number): string {
  return String.fromCharCode(64 + n)
}

function buildFirstRow(destruction: boolean): JSX.Element[] {
  const cells = [<Cell
    key="cell-0"
    className={css.cell0}
    row={0}
    selfDestruction={destruction} />]

  for (let i = 1; i < cols; i++) {
    const id: string = `cell-${numToLetter(i)}`
    cells.push(<Cell
      key={id}
      cellId={id}
      className={css.row}
      label={numToLetter(i)}
      row={0}
      selfDestruction={destruction} />)
  }
  return cells;
}

function buildRows(
  destruction: boolean,
  childrenMap?: Map<string, JSX.Element>): JSX.Element[] {
  const cells: JSX.Element[] = []
  for (let row = 1; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (col === 0) {
        cells.push(
          <Cell
            key={`cell-${row}`}
            cellId={`cell-${row}`}
            className={css.col}
            label={`${row}`}
            row={row}
            selfDestruction={destruction} />
        )
        continue
      }
      const cellId: string = numToLetter(col) + row
      const child: JSX.Element | undefined = childrenMap?.get(cellId)
      const hasChild: () => string = () => child ? '' : css.empty
      cells.push(
        <Cell
          key={`cell-${cellId}`}
          cellId={`cell-${cellId}`}
          className={`${css.cell} ${hasChild()}`}
          row={row}
          selfDestruction={destruction}>
          {child}
        </Cell>)
    }
  }
  return cells
}

export default ExcelGrid;