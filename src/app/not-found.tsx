import Link from 'next/link'
import S from './styles.module.scss'

export async function generateMetadata() {
  return { title: 'Page Not Found' }
}

export default function PageNotFound() {
  return (
    <main data-testid="page-not-found" className={S.main}>
      <div className={S.containerNotFound}>
        <h1 data-testid="page-not-found-title" className={S.titleNotFound}>
          Ops! Não encontramos a página que você procura
        </h1>

        <span data-testid="page-not-found-text" className={S.textNotFound}>
          Infelizmente você tentou solicitar uma página que não existe em nosso catálogo...
        </span>

        <Link data-testid="page-not-found-link" className={S.linkNotFound} href="/">
          Voltar para a Home
        </Link>
      </div>
    </main>
  )
}
