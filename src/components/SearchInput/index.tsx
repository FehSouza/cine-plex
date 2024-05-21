'use client'

import { FullMovie, FullPerson } from '@/@types'
import { getSearchResults } from '@/services'
import { dispatchOpenSearch } from '@/states/openSearch'
import { useRouter } from 'next/navigation'
import { Dispatch, MutableRefObject, SetStateAction, useRef } from 'react'
import { BsSearch } from 'react-icons/bs'
import S from './styles.module.scss'

interface SearchInputProps {
  inputRef: MutableRefObject<null>
  buttonRef: MutableRefObject<null>
  query: string
  setQuery: Dispatch<SetStateAction<string>>
  setLoading: Dispatch<SetStateAction<boolean>>
  setMovieSuggestions: Dispatch<SetStateAction<FullMovie | undefined>>
  setPersonSuggestions: Dispatch<SetStateAction<FullPerson | undefined>>
}

export const SearchInput = ({
  inputRef,
  buttonRef,
  query,
  setQuery,
  setLoading,
  setMovieSuggestions,
  setPersonSuggestions,
}: SearchInputProps) => {
  const router = useRouter()

  let timerDebounce = useRef<NodeJS.Timeout | undefined>(undefined)

  const handleSearch = () => {
    if (!query) return
    dispatchOpenSearch(false)
    router.push(`/search?q=${query}`)
  }

  const handleSearchSuggestions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setLoading(true)
    setQuery(value)
    clearTimeout(timerDebounce.current)

    timerDebounce.current = setTimeout(async () => {
      const result = await getSearchResults({ query: value })
      setLoading(false)
      setMovieSuggestions(result.movies)
      setPersonSuggestions(result.people)
    }, 500)
  }

  return (
    <nav data-testid="search-input-button" className={S.container}>
      <input
        data-testid="search-input"
        className={S.searchInput}
        ref={inputRef}
        placeholder="O que você está buscando?"
        autoFocus
        value={query}
        onChange={handleSearchSuggestions}
        onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
      />

      <button
        data-testid="search-button"
        className={S.searchButton}
        ref={buttonRef}
        aria-label="button-search"
        onClick={handleSearch}
      ></button>

      <BsSearch size={20} />
    </nav>
  )
}
