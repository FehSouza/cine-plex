import Carousel from './_components/Carousel'
import MainBanner from './_components/MainBanner'
import { getBestMovies, getNowPlaying, getPopular, getUpcoming } from './services'
import S from './styles.module.scss'

export default async function Home() {
  const bestMovies = await getBestMovies()
  const nowPlaying = await getNowPlaying()
  const upcoming = await getUpcoming()
  const popular = await getPopular()

  return (
    <main className={S.main}>
      <div className={S.content}>
        <MainBanner movies={bestMovies} />
        <Carousel title="Em Cartaz" movies={nowPlaying} />
        <hr className={S.division} />
        <Carousel title="Em Breve" movies={upcoming} upcoming={true} />
        <hr className={S.division} />
        <Carousel title="Nossas Sugestões" movies={popular} />
      </div>
    </main>
  )
}
