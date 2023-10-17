import { Biography, CreditsList } from '@/app/_components'
import { DICTIONARY_GENDER } from '@/dictionary'
import { getPerson, getPersonCredits } from '@/services'
import { getListCredits, removeDuplicates } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import S from './styles.module.scss'

interface PersonProps {
  params: { id: string }
}

export default async function Person({ params }: PersonProps) {
  const id = params.id

  const [person, credits] = await Promise.all([getPerson(id), getPersonCredits(id)])

  const name = person.name
  const biography = person.biography
  const gender = person.gender as keyof typeof DICTIONARY_GENDER

  const setCredits = new Set()
  const listCredits = [...credits.cast, ...credits.crew]
  const creditsFormatted = listCredits.filter((credit) => removeDuplicates({ item: credit, set: setCredits }))

  const listCreditsOrdered = getListCredits(listCredits)

  const bestMovies = [...creditsFormatted]
    .sort(function (a, b) {
      if (a.vote_count > b.vote_count) return -1
      if (a.vote_count < b.vote_count) return 1
      return 0
    })
    .splice(0, 6)

  return (
    <main className={S.main}>
      <Biography person={person} quantCredits={creditsFormatted.length} />

      <section className={S.container}>
        <h1 className={S.titleDesktop}>{name}</h1>

        <div className={S.content}>
          <h2 className={S.title}>Biografia</h2>
          <span className={S.text}>{biography ? biography : `Não possuímos uma biografia para ${name}`}</span>
        </div>

        <div className={S.content}>
          <h2 className={S.title}>{`${gender === 1 ? 'Conhecida' : 'Conhecido'} por`}</h2>

          <ul className={S.bestMovies}>
            {bestMovies.map((movie) => (
              <li className={S.movie} key={`${id}-${movie.id}`}>
                <Link href={`/filme/${movie.id}`}>
                  <Image
                    className={S.movieImage}
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={`Imagem do Filme ${movie.title ?? movie.name}`}
                    width={134}
                    height={201}
                    priority
                  />

                  <span className={S.movieTitle}>{movie.title ?? movie.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <CreditsList gender={gender} id={id} listCredits={listCreditsOrdered} />
      </section>
    </main>
  )
}
