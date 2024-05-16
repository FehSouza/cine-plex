import { Carousel, LoaderBackdrop, LoaderPoster, ProvidersToWatch, VideoLazyLoad } from '@/components'
import { DISABLE_IMAGE_OPTIMIZATION } from '@/config'
import {
  getClassificationsByRegion,
  getCreditsMovie,
  getMovie,
  getRecommendationsWithThumbnail,
  getVideo,
  getWatchWithInfos,
} from '@/services'
import { formatDate, formatHours, formatReleaseDate, loader200, loaderOriginal } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { BsFillStarFill, BsImage, BsPerson } from 'react-icons/bs'
import S from './styles.module.scss'

interface MovieProps {
  params: { id: string }
}

export default async function Movie({ params }: MovieProps) {
  const id = params.id

  const [movie, classifications, credits, videos, watch, recommendations] = await Promise.all([
    getMovie(id),
    getClassificationsByRegion(id),
    getCreditsMovie(id),
    getVideo(id),
    getWatchWithInfos(id),
    getRecommendationsWithThumbnail(id),
  ])

  const image = movie.backdrop_path
  const poster = movie.poster_path
  const grade = movie.vote_average
  const title = movie.title
  const duration = movie.runtime
  const classificationBR = classifications.find((c) => c.country === 'BR')
  const classificationUS = classifications.find((c) => c.country === 'US')
  const releaseDate = movie.release_date
  const releaseDateFormatted = formatDate(releaseDate)
  const releaseYear = formatReleaseDate(releaseDate)
  const status = movie.status

  const genres = movie.genres
  const tagline = movie.tagline
  const originalTitle = movie.original_title
  const description = movie.overview
  const productionCompanies = movie.production_companies
  const directorInfo = credits.crew.find((person) => person.job === 'Director')
  const directorName = directorInfo?.name
  const directorId = directorInfo?.id
  const castList = credits.cast.slice(0, 8)
  const actorsNames = castList.slice(0, 3).map((actor) => ({ name: actor.name, id: actor.id }))
  const videoList = videos.slice(0, 2)

  const availableToStream = watch?.flatrate
  const availableToRent = watch?.rent
  const availableToBuy = watch?.buy
  const availableToAds = watch?.ads
  const watchProvider = availableToStream ?? availableToRent ?? availableToBuy ?? availableToAds

  return (
    <main className={S.main}>
      <section className={S.imageWrapper}>
        <div className={S.gradient} />
        {image && (
          <Image
            className={S.image}
            loader={LoaderBackdrop}
            src={image}
            alt={`Imagem do Filme ${title}`}
            fill
            unoptimized={DISABLE_IMAGE_OPTIMIZATION}
          />
        )}
        {!image && <div className={S.withoutImage} />}
      </section>

      <section className={[S.container, S.containerAbout].join(' ')}>
        {poster && (
          <Image
            className={S.imagePoster}
            loader={LoaderPoster}
            src={poster}
            alt={`Poster do Filme ${title}`}
            fill
            priority
            unoptimized={DISABLE_IMAGE_OPTIMIZATION}
          />
        )}

        {!poster && (
          <div className={[S.imagePoster, S.withoutImagePoster].join(' ')}>
            <BsImage size={80} />
          </div>
        )}

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

          {status === 'Released' && !!releaseYear && (
            <>
              <span className={S.subTitle2}>Lançamento</span>
              <span className={S.content}>{releaseYear}</span>
            </>
          )}

          {status !== 'Released' && !!releaseDateFormatted && (
            <>
              <span className={S.subTitle2}>Estreia</span>
              <span className={S.content}>{releaseDateFormatted}</span>
            </>
          )}

          <div className={S.listGenres}>
            {genres.map((genre) => (
              <p key={genre.id}>{genre.name}</p>
            ))}
          </div>

          {watchProvider && (
            <div className={S.watchWrapper}>
              <div className={S.watchImageWrapper}>
                <Image
                  className={S.watchImage}
                  loader={loaderOriginal}
                  src={watchProvider[0].logo_path}
                  alt={`Assista ${title} na ${watchProvider[0].provider_name}`}
                  title={`Assista na ${watchProvider[0].provider_name}`}
                  fill
                  unoptimized={DISABLE_IMAGE_OPTIMIZATION}
                />
              </div>
              <span>{availableToStream ? 'Assista agora!' : 'Disponível para alugar ou comprar!'}</span>
            </div>
          )}
        </div>
      </section>

      <section className={S.container}>
        {!!tagline && <span className={[S.content, S.contentTagline].join(' ')}>{tagline}</span>}

        <span className={[S.subTitle2, S.originalTitle].join(' ')}>Nome Original</span>
        <span className={S.content}>{originalTitle}</span>

        {!!description && (
          <>
            <span className={S.subTitle2}>Sinopse</span>
            <span className={S.content}>{description}</span>
          </>
        )}

        {!!productionCompanies?.length && (
          <>
            <span className={S.subTitle2}>Produção</span>
            <span key={`company-${productionCompanies[0].id}`} className={S.content}>
              {productionCompanies[0].name}
            </span>
          </>
        )}

        {!!directorName && (
          <>
            <span className={S.subTitle2}>Direção</span>
            <Link href={`/pessoa/${directorId}`} className={[S.content, S.contentLink].join(' ')}>
              {directorName}
            </Link>
          </>
        )}

        {!!actorsNames?.length && (
          <>
            <span className={S.subTitle2}>Estrelando</span>
            <div className={S.actorsList}>
              {actorsNames.map((actor, i) => {
                const quant = actorsNames.length
                return (
                  <>
                    <Link key={actor.id} href={`/pessoa/${actor.id}`} className={S.contentLink}>
                      {actor.name}
                    </Link>

                    {((quant >= 2 && i === 0) || (quant === 3 && i === 1)) && <span className={S.comma}>,</span>}
                  </>
                )
              })}
            </div>
          </>
        )}
      </section>

      {!!videoList?.length && <hr className={S.division} />}
      {!!videoList?.length && (
        <section className={S.container}>
          <h2 className={S.subTitle}>Trailers</h2>
          <div className={S.contentVideos}>
            {videoList.map((video) => (
              <VideoLazyLoad key={video.key} videoKey={video.key} alt={title} />
            ))}
          </div>
        </section>
      )}

      {!!watchProvider && <hr className={S.division} />}
      {!!watchProvider && (
        <section className={S.container}>
          <h2 className={S.subTitle}>{`Onde assistir ${title}`}</h2>
          {availableToStream && <ProvidersToWatch id={id} providers={availableToStream} titleMovie={title} title="Stream" />}
          {availableToRent && <ProvidersToWatch id={id} providers={availableToRent} titleMovie={title} title="Alugar" />}
          {availableToBuy && <ProvidersToWatch id={id} providers={availableToBuy} titleMovie={title} title="Comprar" />}
          {availableToAds && <ProvidersToWatch id={id} providers={availableToAds} titleMovie={title} title="Propagandas" />}
        </section>
      )}

      {!!castList?.length && <hr className={S.division} />}
      {!!castList?.length && (
        <section className={S.container}>
          <h2 className={S.subTitle}>Elenco principal</h2>

          <ul className={S.castWrapper}>
            {castList.map((actor) => {
              const id = actor.id
              const image = actor.profile_path
              const name = actor.name
              const gender = actor.gender
              const character = actor.character
              const characterFormatted = character
                .replace('(voice)', '(voz)')
                .replace('(uncredited)', '(sem créditos)')
                .replace('(archive footage)', '(imagens de arquivo)')
                .replace('(archival footage)', '(imagens de arquivo)')
                .replace('Self', `${gender === 1 ? 'Ela própria' : 'Ele próprio'}`)

              return (
                <li className={S.actorWrapper} key={id}>
                  <Link className={S.actorLink} href={`/pessoa/${id}`}>
                    <div className={S.actorImageWrapper}>
                      {image && (
                        <Image
                          className={S.actorImage}
                          loader={loader200}
                          src={image}
                          alt={`Imagem de ${name}`}
                          fill
                          unoptimized={DISABLE_IMAGE_OPTIMIZATION}
                        />
                      )}
                      {!image && <BsPerson size={32} className={S.imagePerson} />}
                    </div>
                    <span className={S.actorName}>{name}</span>
                    {character && <span className={S.actorCharacter}>{characterFormatted}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>

          <Link className={S.castLink} href={`/filme/${id}/elenco`}>
            Veja a lista completa do elenco e da equipe técnica
          </Link>
        </section>
      )}

      {!!recommendations?.length && <hr className={S.division} />}
      {!!recommendations?.length && <Carousel title="Nossas Recomendações" movies={recommendations} moviePage />}
    </main>
  )
}
