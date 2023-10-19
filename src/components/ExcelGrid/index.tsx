import { CSSProperties, LegacyRef, useEffect, useRef, useState } from 'react'
import { Entropy, useEntropy } from '@/hooks/entropyContext'
import DownloadButton from '../DownloadButton'
import PageTitle from '../PageTitle'
import css from './ExcelGrid.module.css'
import json from './paragraphs.json'


type Cell = {
  el: JSX.Element
  colSpan?: number
}

function ExcelGrid(): JSX.Element {
  const entropy: Entropy = useEntropy()
  const paragraphs = json.paragraphs
  const totalCols: number = 4
  const totalRows: number = paragraphs.length + 3

  const contentMap: Map<string, Cell> = new Map()
  contentMap
    .set('A1', { el: <PageTitle />, colSpan: 3 })
    .set(`B${paragraphs.length + 2}`, { el: <DownloadButton /> })
  paragraphs.forEach((p: string, i: number) => {
    const cell: string = 'B' + (2 + i)
    contentMap.set(cell, { el: <p>{p}</p> })
  })

  useEffect(() => {

  }) 

  const setDestruction: () => boolean = () => entropy.value === entropy.max
  return (
    <div className={`${css.main} pseudos flex`}>
      <article className={css.content}>
        {buildFirstRow(setDestruction(), totalCols)}
        {buildRows(setDestruction(), totalCols, totalRows, contentMap)}
      </article>
    </div>
  );
}

type CellElement = {
  selfDestruction: boolean,
  children?: JSX.Element,
  className?: string,
  colSpan?: number,
  label?: string,
}

function Cell({
  selfDestruction,
  children,
  className = css.cell,
  colSpan,
  label = '' }: CellElement): JSX.Element {
  const ref: LegacyRef<HTMLDivElement> = useRef(null)
  const initialStyle: CSSProperties = colSpan ?
    {gridColumn: `span ${colSpan}`} : {}
  const [style, setStyle] = useState(initialStyle);
  const randomDeg: () => string = () => (
    !!Math.round(Math.random()) ? '-' : ''
  ) + Math.round(Math.random() * 45) + 'deg'

  const fall: () => number = () => {
    if (!ref.current || !ref.current.parentElement) {
      return 0
    }
    const el: HTMLDivElement = ref.current
    return (el.parentElement as HTMLElement).offsetHeight - el.offsetTop - el.offsetHeight
  }

  const updateStyle: () => void = () => {
    setStyle({
      ...style,
      transform: !selfDestruction ? '' : `rotate(${randomDeg()}) translateY(${fall()}px)`,
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
      style={style}
      ref={ref}>
      {children}
    </div>
  )
}

function mapCellId(col: number, row: number): string {
  return `${String.fromCharCode(64 + col)}${row}`
}

function buildFirstRow(destruction: boolean, numCols: number): JSX.Element[] {
  const cells = [<Cell
    key="cell-00"
    className={css.cell0}
    selfDestruction={destruction} />]

  for (let i = 1; i < numCols; i++) {
    cells.push(<Cell
      key={`cell-0${i}`}
      className={css.row}
      label={String.fromCharCode(64 + i)}
      selfDestruction={destruction} />)
  }
  return cells;
}

function buildRows(
  destruction: boolean,
  cols: number,
  rows: number,
  childrenMap?: Map<string, Cell>): JSX.Element[] {
  const cells: JSX.Element[] = []
  for (let row = 1; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (col === 0) {
        cells.push(
          <Cell
            key={`cell-${row}`}
            className={css.col}
            selfDestruction={destruction}
            label={`${row}`} />
        )
        continue
      }
      const cellId: string = mapCellId(col, row)
      const child: Cell | undefined = childrenMap?.get(cellId)
      cells.push(
        <Cell
          key={`cell${cellId}`}
          className={css.cell}
          colSpan={child?.colSpan ? child.colSpan : undefined}
          selfDestruction={destruction}>
          {child?.el}
        </Cell>)
      col += child?.colSpan ? child.colSpan : 0
    }
  }
  return cells
}

export default ExcelGrid;