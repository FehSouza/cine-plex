import { TMDBPosterLoader, TeamTab } from '@/app/_components'
import { getCreditsMovie, getMovie } from '@/services'
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

  return (
    <main className={S.main}>
      <section className={S.container}>
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

      <TeamTab credits={credits} />
    </main>
  )
}
