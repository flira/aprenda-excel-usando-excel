import PageTitle from '../PageTitle'
import css from './ExcelGrid.module.css'

function ExcelGrid(): JSX.Element {
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
        {buildRow(1, PageTitle())}
        {buildRow(2, downloadBtn)}
        {bgGrid}
      </article>
    </div>
  );
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
  window.open(
    '/Aprenda-Excel-Usando-Excel.xlsx',
    'download-tab'
  )
}

export default ExcelGrid;