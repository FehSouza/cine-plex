import Link from 'next/link'
import S from './styles.module.scss'

export const PageNotFound = () => {
  return (
    <main className={S.main}>
      <div className={S.container}>
        <h1 className={S.title}>Ops! Não encontramos a página que você procura</h1>

        <span className={S.text}>Infelizmente você tentou solicitar uma página que não existe em nosso catálogo...</span>

        <Link className={S.link} href="/">
          Voltar para a Home
        </Link>
      </div>
    </main>
  )
}
