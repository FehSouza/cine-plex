import { TMDBBackdropLoader } from '@/app/_components'
import { getCreditsMovie, getMovie } from '@/app/services'
import { formatReleaseDate } from '@/utils'
import Image from 'next/image'
import S from './styles.module.scss'

interface MovieProps {
  params: { id: string }
}

export default async function Movie({ params }: MovieProps) {
  const id = params.id
  const [movie, credits] = await Promise.all([getMovie(id), getCreditsMovie(id)])

  const image = movie.backdrop_path
  const title = movie.title
  const releaseYear = formatReleaseDate(movie.release_date)
  const description = movie.overview
  const actorsInfo = credits.cast.slice(0, 3)
  const actorsNames = actorsInfo.map((actor) => actor.name)
  const directorInfo = credits.crew.find((person) => person.job === 'Director')
  const directorName = directorInfo?.name

  return (
    <main className={S.main}>
      <div className={S.imageWrapper}>
        <Image className={S.image} loader={TMDBBackdropLoader} src={image} alt={`Imagem do Filme ${title}`} fill />
        <div className={S.info}>
          <div className={S.infoWrapper}>
            <span className={S.title}>{title}</span>
            <span className={S.releaseYear}>{releaseYear}</span>
            <span className={S.description}>{description}</span>
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
      </div>
      <div className={S.container}></div>
    </main>
  )
}
