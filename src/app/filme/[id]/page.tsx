import { TMDBBackdropLoader, TMDBPosterLoader } from '@/app/_components'
import { getClassifications, getCreditsMovie, getMovie, getVideo } from '@/app/services'
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

  const [movie, classifications, credits, videos] = await Promise.all([
    getMovie(id),
    getClassifications(id),
    getCreditsMovie(id),
    getVideo(id),
  ])

  console.log(classifications)

  const poster = movie.poster_path
  const title = movie.title
  const grade = movie.vote_average
  const genres = movie.genres
  const classificationBR = classifications.find((c) => c.country === 'BR')
  const classificationUS = classifications.find((c) => c.country === 'US')
  const duration = movie.runtime
  const originalTitle = movie.original_title
  const releaseYear = formatReleaseDate(movie.release_date)
  const description = movie.overview
  const directorInfo = credits.crew.find((person) => person.job === 'Director')
  const directorName = directorInfo?.name
  const actorsInfo = credits.cast.slice(0, 3)
  const actorsNames = actorsInfo.map((actor) => actor.name)
  const videoList = videos.slice(0, 2)

  return (
    <main className={S.main}>
      <section className={S.imageWrapper}>
        <div className={S.gradient} />
        <Image className={S.image} loader={TMDBBackdropLoader} src={movie.backdrop_path} alt={`Imagem do Filme ${title}`} fill priority />
      </section>

      <section className={[S.container, S.containerAbout].join(' ')}>
        <Image className={S.imagePoster} loader={TMDBPosterLoader} src={poster} alt={`Poster do Filme ${title}`} fill priority />

        <div className={S.contentAbout}>
          {!!grade && (
            <span className={S.grade}>
              <BsFillStarFill /> {grade.toFixed(1)}
            </span>
          )}

          <h1 className={S.title}>{title}</h1>

          <div className={S.infos}>
            {!!duration && <span className={[S.content, S.contentDuration].join(' ')}>{`${duration} min`}</span>}
            {!!classificationBR && <span className={S.content}>{`${classificationBR?.certification}`}</span>}
            {!classificationBR && !!classificationUS && <span className={S.content}>{`${classificationUS?.certification}`}</span>}
          </div>

          <h3 className={S.subTitle2}>Lançamento</h3>
          <span className={S.content}>{releaseYear}</span>

          <div className={S.listGenres}>
            {genres.map((genre) => (
              <p key={genre.id}>{genre.name}</p>
            ))}
          </div>
        </div>
      </section>

      <section className={[S.container, S.containerDescription].join(' ')}>
        <h3 className={[S.subTitle2, S.originalTitle].join(' ')}>Nome Original</h3>
        <span className={S.content}>{originalTitle}</span>

        {!!description && (
          <>
            <h3 className={S.subTitle2}>Sinopse</h3>
            <span className={S.content}>{description}</span>
          </>
        )}

        <h3 className={S.subTitle2}>Direção</h3>
        <span className={S.content}>{directorName}</span>

        <h3 className={S.subTitle2}>Estrelando</h3>
        <span className={S.content}>{actorsNames.join(', ')}</span>
      </section>

      <hr className={S.division} />

      {!!videoList.length && (
        <section className={[S.container, S.containerVideos].join(' ')}>
          <h2 className={S.subTitle}>Trailers</h2>
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
