import Link from 'next/link'
import S from './styles.module.scss'

export const PageNotFound = () => {
  return (
    <main data-testid="page-not-found" className={S.main}>
      <div className={S.container}>
        <h1 data-testid="page-not-found-title" className={S.title}>
          Ops! Não encontramos a página que você procura
        </h1>

        <span data-testid="page-not-found-text" className={S.text}>
          Infelizmente você tentou solicitar uma página que não existe em nosso catálogo...
        </span>

        <Link data-testid="page-not-found-link" className={S.link} href="/">
          Voltar para a Home
        </Link>
      </div>
    </main>
  )
}
