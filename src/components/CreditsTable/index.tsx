import { ListCredits } from '@/@types'
import { DICTIONARY_CREW_DEPARTMENT } from '@/dictionary'
import { CreditLine } from '../CreditLine'
import S from './styles.module.scss'

interface CreditsTableProps {
  list: ListCredits
  filters: string[]
  orderBy: string
  gender: number
}

export const CreditsTable = ({ list, filters, orderBy, gender }: CreditsTableProps) => {
  const listName = String(list[0]) as keyof typeof DICTIONARY_CREW_DEPARTMENT
  const listYears = Object.entries(list[1])

  if (!filters.includes(listName) && !!filters.length) return

  return (
    <div data-testid="credits-table" className={S.container}>
      <h2 className={S.title}>{DICTIONARY_CREW_DEPARTMENT[listName]}</h2>

      <ul data-testid="credits-table-list" className={[S.creditsList, orderBy === 'Ascendente' ? S.asc : ''].join(' ')}>
        {listYears.map((item) => (
          <CreditLine key={`${listName}-${item[0]}`} item={item} listName={listName} gender={gender} />
        ))}
      </ul>
    </div>
  )
}
