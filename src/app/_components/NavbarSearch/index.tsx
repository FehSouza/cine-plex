'use client'

import { dispatchOpenSearch } from '@/states/openSearch'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import S from './styles.module.scss'
import { FullMovie } from '@/@types'

export const NavbarSearch = () => {
  const router = useRouter()
  const searchInputRef = useRef(null)
  const searchButtonRef = useRef(null)
  const searchResults = useRef(null)
  let timerDebounce = useRef<NodeJS.Timeout | undefined>(undefined)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<FullMovie>()

  console.log({ suggestions })

  const handleCloseSearch = useCallback((e: MouseEvent) => {
    if (e.target === searchInputRef.current) return
    if (e.target === searchButtonRef.current) return
    if (e.target === searchResults.current) return
    dispatchOpenSearch(false)
  }, [])

  const handleSearch = () => {
    if (!query) return
    dispatchOpenSearch(false)
    router.push(`/search?q=${query}`)
  }

  const handleSearchSuggestions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setQuery(value)

    clearTimeout(timerDebounce.current)

    timerDebounce.current = setTimeout(async () => {
      const response = await fetch(`/api/search?q=${value}`)
      const result = await response.json()
      setSuggestions(result)
    }, 500)
  }

  useEffect(() => {
    document.addEventListener('click', handleCloseSearch)
    return () => document.removeEventListener('click', handleCloseSearch)
  }, [handleCloseSearch])

  return (
    <div className={S.container}>
      <nav className={S.navContent}>
        <input
          className={S.searchInput}
          ref={searchInputRef}
          placeholder="O que você está buscando?"
          autoFocus
          value={query}
          onChange={(e) => handleSearchSuggestions(e)}
          onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
        />

        <button className={S.searchButton} ref={searchButtonRef} aria-label="button-search" onClick={handleSearch}></button>

        <BsSearch size={20} />
      </nav>

      {!!suggestions?.results.length && (
        <div className={S.resultsContent}>
          <span className={S.subTitle}>Filmes sugeridos</span>

          <ul className={S.list}>
            {suggestions.results.slice(0, 7).map((suggestion) => {
              const id = suggestion.id
              const name = suggestion.title

              return (
                <li className={S.item} key={id}>
                  <a href={`/filme/${id}`}>{name}</a>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
