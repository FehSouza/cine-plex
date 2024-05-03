import { DICTIONARY_CREW_DEPARTMENT } from '@/dictionary'
import { IoIosArrowDown } from 'react-icons/io'
import S from './styles.module.scss'

interface FilterProps {
  title: string
  filterOptions: string[]
  handleFilter: (value: string) => void
  filters?: string[]
  orderBy?: string
}

export const Filter = ({ title, filterOptions, handleFilter, filters, orderBy }: FilterProps) => {
  return (
    <>
      {!!title && !!filterOptions?.length && (
        <div data-testid="filter" className={S.container}>
          <div className={S.filterTitle}>
            <span data-testid="filter-title">{title}</span>
            <IoIosArrowDown size={12} className={S.filterArrow} />
          </div>

          <ul className={S.filterWrapper}>
            {filterOptions.map((filter, index) => {
              const name = filter as keyof typeof DICTIONARY_CREW_DEPARTMENT

              return (
                <li
                  data-testid={`filter-${name}-${index}`}
                  key={`filter-${name}`}
                  className={[S.filterItem, filters?.includes(name) || name === orderBy ? S.active : ''].join(' ')}
                  onClick={() => handleFilter(name)}
                >
                  {DICTIONARY_CREW_DEPARTMENT[name] ? DICTIONARY_CREW_DEPARTMENT[name] : name}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}
