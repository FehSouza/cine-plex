import { PersonCast, PersonCrew } from '@/@types'
import { DICTIONARY_CREW_DEPARTMENT } from '@/dictionary'
import { CreditLine } from '../CreditLine'
import S from './styles.module.scss'

interface CreditsTableProps {
  list: (
    | string
    | Record<
        string,
        {
          year: number
          date: string
          info: PersonCast | PersonCrew
        }[]
      >
  )[]
  filters: string[]
  orderBy: string
  gender: number
}

export const CreditsTable = ({ list, filters, orderBy, gender }: CreditsTableProps) => {
  const listName = String(list[0]) as keyof typeof DICTIONARY_CREW_DEPARTMENT
  const listYears = Object.entries(list[1])

  if (!filters.includes(listName) && filters.length !== 1) return

  return (
    <div data-testid="credits-table" className={S.container}>
      <h2 className={S.title}>{DICTIONARY_CREW_DEPARTMENT[listName]}</h2>

      <ul data-testid="credits-table-list" className={[S.creditsList, orderBy === 'asc' ? S.asc : ''].join(' ')}>
        {listYears.map((item) => (
          <CreditLine key={`${listName}-${item[0]}`} item={item} listName={listName} gender={gender} />
        ))}
      </ul>
    </div>
  )
}
