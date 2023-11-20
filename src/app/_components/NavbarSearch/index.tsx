'use client'

import { dispatchOpenSearch } from '@/states/openSearch'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import S from './styles.module.scss'

export const NavbarSearch = () => {
  const router = useRouter()
  const searchInputRef = useRef(null)
  const searchButtonRef = useRef(null)
  let timerDebounce = useRef<NodeJS.Timeout | undefined>(undefined)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])

  console.log(suggestions)

  const handleCloseSearch = useCallback((e: MouseEvent) => {
    if (e.target === searchInputRef.current) return
    if (e.target === searchButtonRef.current) return
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
    <nav className={S.container}>
      <input
        className={S.searchInput}
        ref={searchInputRef}
        placeholder="O que você está buscando"
        autoFocus
        value={query}
        onChange={(e) => handleSearchSuggestions(e)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') handleSearch()
        }}
      />

      <button className={S.searchButton} ref={searchButtonRef} aria-label="button-search" onClick={handleSearch}></button>

      <BsSearch size={20} />
    </nav>
  )
}
