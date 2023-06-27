import MainBanner from './_components/MainBanner'
import { getBestMovies } from './services'
import S from './styles.module.scss'

export default async function Home() {
  const bestMovies = await getBestMovies()

  return (
    <main className={S.main}>
      <div className={S.content}>
        <MainBanner movies={bestMovies} />
      </div>
    </main>
  )
}
