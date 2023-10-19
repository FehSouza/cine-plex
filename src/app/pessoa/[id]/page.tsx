import { Biography, CreditsList } from '@/app/_components'
import { DICTIONARY_GENDER } from '@/dictionary'
import { getPerson, getPersonCredits } from '@/services'
import { getListCredits, removeDuplicates } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { BsImage } from 'react-icons/bs'
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

        {!!bestMovies.length && (
          <div className={S.content}>
            <h2 className={S.title}>{`${gender === 1 ? 'Conhecida' : 'Conhecido'} por`}</h2>

            <ul className={S.bestMovies}>
              {bestMovies.map((movie) => {
                const poster = movie.poster_path

                return (
                  <li className={S.movie} key={`${id}-${movie.id}`}>
                    <Link href={`/filme/${movie.id}`}>
                      {poster && (
                        <Image
                          className={S.movieImage}
                          src={`https://image.tmdb.org/t/p/w200${poster}`}
                          alt={`Imagem do Filme ${movie.title ?? movie.name}`}
                          width={134}
                          height={201}
                          priority
                        />
                      )}

                      {!poster && (
                        <div className={[S.infoBarImage, S.withoutImagePoster].join(' ')}>
                          <BsImage size={32} />
                        </div>
                      )}

                      <span className={S.movieTitle}>{movie.title ?? movie.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {!!listCreditsOrdered.length && <CreditsList gender={gender} id={id} listCredits={listCreditsOrdered} />}

        {!listCreditsOrdered.length && (
          <div className={S.content}>
            <span className={S.warning}>
              Infelizmente, estamos passando por uma instabilidade em nosso banco de dados de filmes associados.
            </span>
            <span className={S.warning}>Volte novamente mais tarde.</span>
          </div>
        )}
      </section>
    </main>
  )
}
