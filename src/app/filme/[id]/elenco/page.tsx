import { TMDBPosterLoader } from '@/app/_components'
import { getCreditsMovie, getMovie } from '@/app/services'
import Image from 'next/image'
import Link from 'next/link'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import S from './styles.module.scss'

interface ElencoProps {
  params: { id: string }
}

export default async function Elenco({ params }: ElencoProps) {
  const id = params.id

  const [movie, credits] = await Promise.all([getMovie(id), getCreditsMovie(id)])

  const poster = movie.poster_path
  const title = movie.title

  const setCast = new Set()
  const setCrew = new Set()

  const castList = credits.cast.filter((cast) => {
    const duplicatedCast = setCast.has(cast.id)
    setCast.add(cast.id)
    return !duplicatedCast
  })

  const crewList = credits.crew.filter((crew) => {
    const duplicatedCrew = setCrew.has(crew.id)
    setCrew.add(crew.id)
    return !duplicatedCrew
  })

  return (
    <main className={S.main}>
      <section className={[S.container, S.containerInfoBar].join(' ')}>
        <Image
          className={S.infoBarImage}
          loader={TMDBPosterLoader}
          src={poster}
          alt={`Poster do Filme ${title}`}
          sizes="200w"
          fill
          priority
        />

        <div className={S.infoBarWrapper}>
          <h1 className={S.infoBarTitle}>{title}</h1>
          <Link className={S.infoBarBack} href={`/filme/${id}`} aria-label={`Botão para voltar nas informações do Filme ${title}`}>
            <MdKeyboardArrowLeft size={16} /> Voltar
          </Link>
        </div>
      </section>

      {/* <section className={[S.container, S.containerLists].join(' ')}>
        <div>
          <h2>Elenco</h2>

          <div>
            {castList.map((actor) => {
              return <div key={`actor-${actor.id}`}>{actor.id}</div>
            })}
          </div>
        </div>

        <div>
          <h2>Equipe Técnica</h2>

          <div>
            {crewList.map((person) => {
              return <div key={`person-${person.id}`}>{person.id}</div>
            })}
          </div>
        </div>
      </section> */}
    </main>
  )
}
