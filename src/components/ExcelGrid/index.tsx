import { MouseEventHandler } from 'react'
import css from './ExcelGrid.module.css'

type ExcelGridProp = {
  onMouseEnter: MouseEventHandler,
  onMouseLeave: MouseEventHandler
}

const numCols: number = 9;

function buildFirstRow(): JSX.Element[] {
  const cells = [<div key="cell0-0" className={css.row0} />]
  for (let i = 1; i < numCols; i++) {
    cells.push(<div
      key={`cell0-${i}`}
      className={css.row}
      data-label={String.fromCharCode(64 + i)} />)
  }
  console.log(cells);
  return cells;
}

function buildRow(i: number, item?: JSX.Element): JSX.Element[] {
  const cells = [
    <div key={`cell0-${i}`} className={css.col0} data-label={i} />,
    (<div key={`cell1-${i}`} className={css.col}>
      {item ? item : ''}
    </div>)
  ]
  for (let j = 2; j < numCols; j++) {
    cells.push(<div key={`cell${j}-${i}`} className={css.col}></div>);
  }
  return cells;
}

function download(): void {
  const download = window.open(
    '/Aprenda-Excel-Usando-Excel.xlsx',
    'download-tab'
  )
}

function ExcelGrid({ onMouseEnter, onMouseLeave }: ExcelGridProp): JSX.Element {
  const title: JSX.Element = (
    <h1
      className={css.title}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <div className={css.line1}>
        <span className={css.intro1}>Aprenda</span>
        <span className={`${css.wordart1} ${css.shadow}`}>Excel</span>
      </div>
      <div className={css.line2}>
        <span className={css.intro2}>
          <span className={css.rail}>usando</span>
        </span>
        <span className={`${css.wordart2} ${css.shadow}`}>Excel</span>
      </div>
    </h1>
  )
  const downloadBtn = (
    <button className={css.download} onClick={download}>
      Baixar
    </button>
  )
  const bgGrid: JSX.Element[] = [];
  for (let i = 3; i < 50; i++) {
    const row = buildRow(i)
    row.forEach(element => {
      bgGrid.push(element)
    });
  }
  return (
    <div className={`${css.main} pseudos flex`}>
      <article className={css.content}>
        {buildFirstRow()}
        {buildRow(1, title)}
        {buildRow(2, downloadBtn)}
        {bgGrid}
      </article>
    </div>
  );
}

export default ExcelGrid;