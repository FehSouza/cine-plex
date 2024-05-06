'use client'

import { FullMovie, FullPerson } from '@/@types'
import { dispatchOpenSearch } from '@/states/openSearch'
import { useCallback, useEffect, useRef, useState } from 'react'
import { SearchInput } from '../SearchInput'
import { SearchResults } from '../SearchResults'
import S from './styles.module.scss'

interface NavbarSearchProps {
  isMobile?: boolean
}

export const NavbarSearch = ({ isMobile }: NavbarSearchProps) => {
  const inputRef = useRef(null)
  const buttonRef = useRef(null)
  const resultsRef = useRef(null)
  const titleRef1 = useRef(null)
  const titleRef2 = useRef(null)

  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [movieSuggestions, setMovieSuggestions] = useState<FullMovie>()
  const [personSuggestions, setPersonSuggestions] = useState<FullPerson>()

  const handleCloseSearch = useCallback((e: MouseEvent) => {
    if (e.target === inputRef.current) return
    if (e.target === buttonRef.current) return
    if (e.target === resultsRef.current) return
    if (e.target === titleRef1.current) return
    if (e.target === titleRef2.current) return
    dispatchOpenSearch(false)
  }, [])

  useEffect(() => {
    document.addEventListener('click', handleCloseSearch)
    return () => document.removeEventListener('click', handleCloseSearch)
  }, [handleCloseSearch])

  return (
    <div data-testid="navbar-search" className={S.container}>
      <SearchInput
        query={query}
        inputRef={inputRef}
        buttonRef={buttonRef}
        setQuery={setQuery}
        setLoading={setLoading}
        setMovieSuggestions={setMovieSuggestions}
        setPersonSuggestions={setPersonSuggestions}
      />

      {query && (
        <div className={S.resultsContainer} ref={resultsRef}>
          <SearchResults
            ref={titleRef1}
            title="filmes sugeridos"
            searchList={movieSuggestions}
            loading={loading}
            isMobile={isMobile}
            path="/filme/"
          />

          <SearchResults
            ref={titleRef2}
            title="pessoas sugeridas"
            searchList={personSuggestions}
            loading={loading}
            isMobile={isMobile}
            path="/pessoa/"
          />
        </div>
      )}
    </div>
  )
}
