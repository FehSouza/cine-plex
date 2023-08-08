import { Cast, Crew } from '@/@types'
import { TMDBPosterLoader } from '@/app/_components'
import TeamCard from '@/app/_components/TeamCard'
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

  const removeDuplicates = ({ item, set }: { item: Cast | Crew; set: Set<unknown> }) => {
    const duplicated = set.has(item.id)
    set.add(item.id)
    return !duplicated
  }

  const castList = credits.cast.filter((cast) => removeDuplicates({ item: cast, set: setCast }))
  const crewList = credits.crew.filter((crew) => removeDuplicates({ item: crew, set: setCrew }))

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

      <section className={[S.container, S.containerLists].join(' ')}>
        <div className={S.listContent}>
          <h2 className={S.listName}>
            Elenco <span className={S.listQuant}>{`(${castList.length})`}</span>
          </h2>

          <div className={S.listWrapper}>
            {castList.map((item) => {
              const id = item.id
              const image = item.profile_path
              const name = item.name
              const subName = item.character

              return <TeamCard key={`cast-${id}`} id={id} image={image} name={name} subName={subName} />
            })}
          </div>
        </div>

        <hr className={S.division} />

        <div className={S.listContent}>
          <h2 className={S.listName}>
            Equipe Técnica <span className={S.listQuant}>{`(${crewList.length})`}</span>
          </h2>

          <ul className={S.listWrapper}>
            {crewList.map((item) => {
              const id = item.id
              const image = item.profile_path
              const name = item.name
              const subName = item.job

              return <TeamCard key={`cast-${id}`} id={id} image={image} name={name} subName={subName} />
            })}
          </ul>
        </div>
      </section>
    </main>
  )
}