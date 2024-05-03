import { ListCredits } from '@/@types'
import { DICTIONARY_CREW_DEPARTMENT } from '@/dictionary'
import { Dispatch, SetStateAction } from 'react'
import { Filter } from '../Filter'
import S from './styles.module.scss'

interface CreditsFiltersProps {
  listCredits: ListCredits[]
  filters: string[]
  setFilters: Dispatch<SetStateAction<string[]>>
  orderBy: string
  setOrderBy: Dispatch<SetStateAction<string>>
}

export const CreditsFilters = ({ listCredits, filters, setFilters, orderBy, setOrderBy }: CreditsFiltersProps) => {
  const handleFilter = (name: string) => {
    if (name === 'all') return setFilters([])
    if (filters.includes(name)) return setFilters((prev) => prev.filter((item) => item !== name))
    setFilters((prev) => [...prev, name])
  }

  const listFilters = listCredits.map((list) => String(list[0]) as keyof typeof DICTIONARY_CREW_DEPARTMENT)

  return (
    <div data-testid="credits-filters" className={S.container}>
      {!!filters.length && (
        <button data-testid="credits-filters-button" className={S.clearButton} onClick={() => handleFilter('all')}>
          {filters.length === 1 ? 'Limpar seleção' : 'Limpar seleções'}
        </button>
      )}

      <Filter title="Departamentos" filterOptions={listFilters} handleFilter={handleFilter} filters={filters} />
      <Filter title="Ordenação" filterOptions={['Ascendente', 'Descendente']} handleFilter={setOrderBy} orderBy={orderBy} />
    </div>
  )
}
