import { PersonCast, PersonCrew } from '@/@types'
import { CreditCard } from '../CreditCard'
import S from './styles.module.scss'

interface CreditLineProps {
  item: [string, { year: number; date: string; info: PersonCast | PersonCrew }[]]
  listName: string
  gender: number
}

export const CreditLine = ({ item, listName, gender }: CreditLineProps) => {
  const year = item[0]
  const infos = item[1]

  return (
    <>
      {!!year && !!infos?.length && (
        <li data-testid="credit-line" className={S.container}>
          <span className={S.year}>{year}</span>

          <div className={S.moviesWrapper}>
            {infos.map((movie) => (
              <CreditCard key={`${listName}-${year}-${movie.info.id}`} movie={movie.info} gender={gender} />
            ))}
          </div>
        </li>
      )}
    </>
  )
}
