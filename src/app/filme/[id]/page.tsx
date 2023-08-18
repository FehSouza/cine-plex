import { TMDBBackdropLoader, TMDBPosterLoader, VideoIframe } from '@/app/_components'
import { getClassifications, getCreditsMovie, getMovie, getVideo } from '@/services'
import { formatHours, formatReleaseDate } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { BsFillStarFill, BsPerson } from 'react-icons/bs'
import S from './styles.module.scss'

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

  const image = movie.backdrop_path
  const poster = movie.poster_path
  const grade = movie.vote_average
  const title = movie.title
  const duration = movie.runtime
  const classificationBR = classifications.find((c) => c.country === 'BR')
  const classificationUS = classifications.find((c) => c.country === 'US')
  const releaseYear = formatReleaseDate(movie.release_date)
  const genres = movie.genres
  const tagline = movie.tagline
  const originalTitle = movie.original_title
  const description = movie.overview
  const directorInfo = credits.crew.find((person) => person.job === 'Director')
  const directorName = directorInfo?.name
  const castList = credits.cast.slice(0, 8)
  const actorsNames = castList.slice(0, 3).map((actor) => actor.name)
  const videoList = videos.slice(0, 2)

  return (
    <main className={S.main}>
      <section className={S.imageWrapper}>
        <div className={S.gradient} />
        <Image className={S.image} loader={TMDBBackdropLoader} src={image} alt={`Imagem do Filme ${title}`} fill priority />
      </section>

      <section className={[S.container, S.containerAbout].join(' ')}>
        <Image
          className={S.imagePoster}
          loader={TMDBPosterLoader}
          src={poster}
          alt={`Poster do Filme ${title}`}
          sizes="(min-width: 769px) w400, (max-width: 768px) w200"
          fill
          priority
        />

        <div className={S.contentAbout}>
          {!!grade && (
            <span className={S.grade}>
              <BsFillStarFill /> {grade.toFixed(1)}
            </span>
          )}

          <h1 className={S.title}>{title}</h1>

          <div className={S.infos}>
            {!!duration && <span className={[S.content, S.contentDuration].join(' ')}>{formatHours(duration)}</span>}

            {!!classificationBR && (
              <span
                className={S.contentCert}
                style={{ backgroundColor: classificationBR.color }}
              >{`${classificationBR.certification}`}</span>
            )}

            {!classificationBR && !!classificationUS && (
              <span
                className={S.contentCert}
                style={{ backgroundColor: classificationUS.color }}
              >{`${classificationUS.certification}`}</span>
            )}
          </div>

          <span className={S.subTitle2}>Lançamento</span>
          <span className={S.content}>{releaseYear}</span>

          <div className={S.listGenres}>
            {genres.map((genre) => (
              <p key={genre.id}>{genre.name}</p>
            ))}
          </div>
        </div>
      </section>

      <section className={[S.container, S.containerDescription].join(' ')}>
        {!!tagline && <span className={[S.content, S.contentTagline].join(' ')}>{tagline}</span>}

        <span className={[S.subTitle2, S.originalTitle].join(' ')}>Nome Original</span>
        <span className={S.content}>{originalTitle}</span>

        {!!description && (
          <>
            <span className={S.subTitle2}>Sinopse</span>
            <span className={S.content}>{description}</span>
          </>
        )}

        <span className={S.subTitle2}>Direção</span>
        <span className={S.content}>{directorName}</span>

        <span className={S.subTitle2}>Estrelando</span>
        <span className={S.content}>{actorsNames.join(', ')}</span>
      </section>

      {!!videoList.length && <hr className={S.division} />}

      {!!videoList.length && (
        <section className={[S.container, S.containerVideos].join(' ')}>
          <h2 className={S.subTitle}>Trailers</h2>
          <div className={S.contentVideos}>
            {videoList.map((video) => (
              <VideoIframe key={video.key} video={video} title={title} />
            ))}
          </div>
        </section>
      )}

      <hr className={S.division} />

      <section className={[S.container, S.containerCast].join(' ')}>
        <h2 className={S.subTitle}>Elenco principal</h2>

        <ul className={S.castWrapper}>
          {castList.map((actor) => {
            const id = actor.id
            const idImage = actor.profile_path
            const image = `https://image.tmdb.org/t/p/w200${idImage}`
            const name = actor.name
            const character = actor.character

            return (
              <li className={S.actorWrapper} key={id}>
                <a className={S.actorLink} href="" aria-label={`Link para a página de detalhes de ${name}`}>
                  <div className={S.actorImageWrapper}>
                    {idImage && <Image className={S.actorImage} src={image} alt={`Imagem de ${name}`} width={134} height={201} />}
                    {!idImage && <BsPerson size={32} className={S.imagePerson} />}
                  </div>
                  <span className={S.actorName}>{name}</span>
                  <span className={S.actorCharacter}>{character.replace('(voice)', '(voz)')}</span>
                </a>
              </li>
            )
          })}
        </ul>

        <Link className={S.castLink} href={`/filme/${id}/elenco`}>
          Veja a lista completa do elenco e da equipe técnica
        </Link>
      </section>
    </main>
  )
}
