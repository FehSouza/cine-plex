import { TMDBBackdropLoader } from '@/app/_components'
import { getCreditsMovie, getMovie, getVideo } from '@/app/services'
import { formatReleaseDate } from '@/utils'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import S from './styles.module.scss'

const IframeVideo = dynamic(() => import('../../_components/IframeVideo').then((mod) => mod.IframeVideo))
interface MovieProps {
  params: { id: string }
}

export default async function Movie({ params }: MovieProps) {
  const id = params.id
  const [movie, credits, videos] = await Promise.all([getMovie(id), getCreditsMovie(id), getVideo(id)])

  const image = movie.backdrop_path
  const title = movie.title
  const releaseYear = formatReleaseDate(movie.release_date)
  const description = movie.overview
  const actorsInfo = credits.cast.slice(0, 3)
  const actorsNames = actorsInfo.map((actor) => actor.name)
  const directorInfo = credits.crew.find((person) => person.job === 'Director')
  const directorName = directorInfo?.name
  const videoList = videos.slice(0, 3)

  return (
    <main className={S.main}>
      <section className={S.imageWrapper}>
        <Image className={S.image} loader={TMDBBackdropLoader} src={image} alt={`Imagem do Filme ${title}`} fill priority />
        <div className={S.info}>
          <div className={S.infoWrapper}>
            <h1 className={S.title}>{title}</h1>
            <span className={S.releaseYear}>{releaseYear}</span>
            <div className={[S.namesWrapper, S.actors].join(' ')}>
              <span>Estrelando: </span>
              <span className={S.names}>{actorsNames.join(', ')}</span>
            </div>
            <div className={[S.namesWrapper, S.director].join(' ')}>
              <span>Diretor: </span>
              <span className={S.names}>{directorName}</span>
            </div>
          </div>
        </div>
      </section>

      <section className={[S.container, S.containerDescription].join(' ')}>
        <h2 className={S.titleContent}>Descrição</h2>
        <span className={S.description}>{description}</span>
      </section>

      <section className={[S.container, S.containerVideos].join(' ')}>
        <h2 className={S.titleContent}>Trailers</h2>
        <div className={S.contentVideos}>
          {videoList.map((video) => (
            <IframeVideo key={video.key} video={video} />
          ))}
        </div>
      </section>
    </main>
  )
}
