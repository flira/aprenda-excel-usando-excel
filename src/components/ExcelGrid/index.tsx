import DownloadButton from '../DownloadButton'
import PageTitle from '../PageTitle'
import css from './ExcelGrid.module.css'

type Cell = {
  el: JSX.Element
  colSpan?: number
}

const descriptionParagraphs: string[] = [
  'Saudades, WordaArt! Lá em 1997 a vida era bem mais sossegada (porque a gente tinha 9 anos e não pagava conta) a gente usava o computador pra gerar lindas obras de arte usando WordArt e um CD comprado na banca de revista com 19999 Clipart. Aquilo é que era vida.',
  'Hoje em dia WordArt saiu de moda (triste!) e a gente precisa fazer outra coisa no computador. Algumas dessas coisas precisam de Excel. Outras não PRECIIIIISAM de excel, mas a gente consegue se livrar delas muito mais rápido com ele.',
  'Apesar disso muita gente não usa ou evita ao máximo usar o Excel porque é meio intimidante. Tem várias coisas acontecendo, muitas fórmulas, e todo mundo que maja muito de Excel parece ser um mega NERD. Mas você tá aqui porque você tá precisando de Excel, e você não é um mega NERD. Há esperanças?',
  'Boas notícias: Sim! Há esperanças. Eu trabalho com Excel há mais de 10 anos (sim, sou um mega NERD) e durante esse tempo eu entendi que 95% do tempo a gente usa as mesmas 10 fórmulas. O pulo do gato é saber quais são essas fórmulas, QUANDO e COMO utilizá-LAS.',
  'Então eu fiz esse tutotiral pra te ajudar a aprender Excel usando Excel. As abas seguem uma progressão natural de tópicos, e cada uma traz um exemplo de pergunta da vida real que você pode usar Excel para responder. Basta ir seguindo em ordem que ao final do tutorial você já vai conseguir resolver 95% das tretas que aparecem na sua mão. Bora?'
]

function ExcelGrid(): JSX.Element {
  const totalCols: number = 4
  const totalRows: number = descriptionParagraphs.length + 3

  const contentMap: Map<string, Cell> = new Map()
  contentMap
    .set('A1', { el: <PageTitle />, colSpan: 3 })
    .set(`B${descriptionParagraphs.length + 2}`, { el: <DownloadButton/> })
  descriptionParagraphs.forEach((p: string, i: number) => {
    const cell: string = 'B' + (2 + i)
    contentMap.set(cell, { el: <p>{p}</p> })
  })
  return (
    <div className={`${css.main} pseudos flex`}>
      <article className={css.content}>
        {buildFirstRow(totalCols)}
        {buildRows(totalCols, totalRows, contentMap)}
      </article>
    </div>
  );
}

function mapCell(col: number, row: number): string {
  return `${String.fromCharCode(64 + col)}${row}`
}

function buildFirstRow(numCols: number): JSX.Element[] {
  const cells = [<div key="cell0-0" className={css.row0} />]
  for (let i = 1; i < numCols; i++) {
    cells.push(<div
      key={`cell0-${i}`}
      className={css.row}
      data-label={String.fromCharCode(64 + i)} />)
  }
  return cells;
}

function buildRows(
  cols: number,
  rows: number,
  childrenMap?: Map<string, Cell>): JSX.Element[] {
  const cells: JSX.Element[] = []
  for (let row = 1; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (col === 0) {
        cells.push(
          <div key={`cell-${row}`} className={css.col0} data-label={row} />
        )
        continue
      }
      const cell: string = mapCell(col, row);
      const child: Cell = Object.assign({
        colSpan: 0,
        el: ''
      }, childrenMap?.get(cell))
      cells.push(
        <div key={`cell${cell}`} className={css.col} style={
          child.colSpan ? { gridColumn: `span ${child.colSpan}` } : {}
        }>
          {child.el}
        </div>
      )
      col += (child.colSpan as number)
    }
  }
  return cells
}

export default ExcelGrid;