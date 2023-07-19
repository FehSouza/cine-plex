import { TMDBBackdropLoader } from '@/app/_components'
import { getClassification, getCreditsMovie, getMovie, getVideo } from '@/app/services'
import { formatReleaseDate } from '@/utils'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { BsFillStarFill } from 'react-icons/bs'
import S from './styles.module.scss'

const IframeVideo = dynamic(() => import('../../_components/IframeVideo'))
interface MovieProps {
  params: { id: string }
}

export default async function Movie({ params }: MovieProps) {
  const id = params.id
  const [movie, credits, videos, classification] = await Promise.all([
    getMovie(id),
    getCreditsMovie(id),
    getVideo(id),
    getClassification(id),
  ])

  // console.log({ movie, credits, videos, classification })
  const image = movie.backdrop_path
  const title = movie.title
  const originalTitle = movie.original_title
  const description = movie.overview
  const grade = movie.vote_average.toFixed(1)
  const duration = movie.runtime

  const genres = movie.genres

  const releaseYear = formatReleaseDate(movie.release_date)
  const actorsInfo = credits.cast.slice(0, 3)
  const actorsNames = actorsInfo.map((actor) => actor.name)
  const directorInfo = credits.crew.find((person) => person.job === 'Director')
  const directorName = directorInfo?.name
  const videoList = videos.slice(0, 2)
  const classTeste = classification.reduce((acc, c) => {
    if (c.release_dates[0].certification) return (acc = [...acc, c.release_dates[0].certification])
    return acc
  }, [] as string[])

  console.log(classTeste)

  return (
    <main className={S.main}>
      <section className={S.imageWrapper}>
        <Image className={S.image} loader={TMDBBackdropLoader} src={image} alt={`Imagem do Filme ${title}`} fill priority />
        <div className={S.info}>
          <div className={S.infoWrapper}>
            <span className={S.title}>{title}</span>
            <span className={S.description}>{description}</span>
            <span className={S.grade}>
              <BsFillStarFill /> {grade}
            </span>
          </div>
        </div>
      </section>

      <section className={[S.container, S.containerAbout].join(' ')}>
        <h2 className={S.titleContent}>Sobre o filme</h2>

        <div className={S.listGenres}>
          {genres.map((genre) => (
            <p key={genre.id}>{genre.name}</p>
          ))}
        </div>

        <h3 className={S.subTitleContent}>Classificação</h3>
        <span className={S.description}>{`${duration}`}</span>

        <h3 className={S.subTitleContent}>Duração</h3>
        <span className={S.description}>{`${duration}min`}</span>

        <h3 className={S.subTitleContent}>Nome Original</h3>
        <span className={S.description}>{originalTitle}</span>

        <h3 className={S.subTitleContent}>Lançamento</h3>
        <span className={S.description}>{releaseYear}</span>

        <h3 className={S.subTitleContent}>Sinopse</h3>
        <span className={S.description}>{description}</span>

        <h3 className={S.subTitleContent}>Direção</h3>
        <span className={S.description}>{directorName}</span>

        <h3 className={S.subTitleContent}>Estrelando</h3>
        <span className={S.description}>{actorsNames}</span>
      </section>

      {!!videoList.length && (
        <section className={[S.container, S.containerVideos].join(' ')}>
          <h2 className={S.titleContent}>Trailers</h2>
          <div className={S.contentVideos}>
            {videoList.map((video) => (
              <IframeVideo key={video.key} video={video} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
