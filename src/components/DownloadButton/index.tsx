import css from './DownloadButton.module.css'

function DownloadButton(): JSX.Element {
  return (
    <div className={css.wrapper}>
      <button className={css.button} onClick={download}>
        Baixar curso
      </button>
    </div>
  )
}

function download(): void {
  window.open(
    '/Aprenda-Excel-Usando-Excel.xlsx',
    'download-tab'
  )
}

export default DownloadButton