import { MainBanner, Carousel } from './_components'
import { getBestMovies, getNowPlaying, getPopular, getUpcoming } from './services'
import S from './styles.module.scss'

export default async function Home() {
  const [bestMovies, nowPlaying, upcoming, popular] = await Promise.all([getBestMovies(), getNowPlaying(), getUpcoming(), getPopular()])

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
