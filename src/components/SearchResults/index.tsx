import { FullMovie, FullPerson } from '@/@types'
import { forwardRef } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { SearchItem } from '../SearchItem'
import S from './styles.module.scss'

interface SearchResultsProps {
  title: string
  searchList: FullMovie | FullPerson | undefined
  loading: boolean
  isMobile?: boolean
  path: string
}

export const SearchResults = forwardRef<HTMLSpanElement, SearchResultsProps>(({ title, searchList, loading, isMobile, path }, ref) => {
  const titleFormatted = !!title ? title : 'Sugeridos'
  const results = searchList?.results

  return (
    <div data-testid="search-results">
      <span data-testid="search-results-title" className={S.title} ref={ref}>
        {titleFormatted}
      </span>

      <ul className={S.list}>
        {!results?.length && loading && (
          <li className={S.item} data-testid="search-results-loading">
            <AiOutlineLoading3Quarters size={20} />
          </li>
        )}

        {((!results?.length && !loading) || !path) && (
          <li className={S.item} data-testid="search-results-without-items">
            <span>{`Sem ${titleFormatted} para o termo digitado`}</span>
          </li>
        )}

        {!!path &&
          results
            ?.slice(0, isMobile ? 4 : 5)
            .map((suggestion) => <SearchItem key={`suggestion-${suggestion.id}`} suggestion={suggestion} path={path} />)}
      </ul>
    </div>
  )
})
