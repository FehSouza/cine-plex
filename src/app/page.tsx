import { getBestMoviesWithInfos, getNowPlayingWithThumbnail, getPopular, getUpcoming } from '@/services'
import { Carousel, MainBanner } from '../components'
import S from './styles.module.scss'

export default async function Home() {
  const [bestMovies, nowPlaying, upcoming, popular] = await Promise.all([
    getBestMoviesWithInfos(),
    getNowPlayingWithThumbnail(),
    getUpcoming(),
    getPopular(),
  ])

  return (
    <main className={S.main}>
      <div className={S.content}>
        <MainBanner movies={bestMovies} />
        <Carousel title="Em Cartaz" hrefTitle="/cartaz" movies={nowPlaying} />
        <hr className={S.division} />
        <Carousel title="Em Breve" hrefTitle="/estreias" movies={upcoming} upcoming={true} />
        <hr className={S.division} />
        <Carousel title="Nossas Sugestões" hrefTitle="/sugestoes" movies={popular} />
      </div>
    </main>
  )
}
