import { PersonCast, PersonCrew } from '@/@types'
import Link from 'next/link'
import S from './styles.module.scss'

interface CreditCardProps {
  movie: PersonCast | PersonCrew
  gender: number
}

export const CreditCard = ({ movie, gender }: CreditCardProps) => {
  const movieId = movie.id
  const movieName = movie.title ?? movie.name
  const character = movie.character ?? movie.job ?? ''
  const characterText = character
    .replace('(voice)', '(voz)')
    .replace('(uncredited)', '(sem créditos)')
    .replace('(archive footage)', '(imagens de arquivo)')
    .replace('(archival footage)', '(imagens de arquivo)')
    .replace('Self', `${gender === 1 ? 'ela própria' : 'ele próprio'}`)

  return (
    <>
      {!!movieId && !!movieName && (
        <Link data-testid="credit-card" className={S.container} href={`/filme/${movieId}`}>
          <span data-testid="credit-card-name" className={S.movieName}>
            {movieName}
          </span>
          {!!characterText && <span data-testid="credit-card-character" className={S.characterText}>{`como ${characterText}`}</span>}
        </Link>
      )}
    </>
  )
}
