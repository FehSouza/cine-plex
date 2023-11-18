'use client'

import { dispatchOpenSearch } from '@/states/openSearch'
import { useCallback, useEffect, useRef } from 'react'
import { BsSearch } from 'react-icons/bs'
import S from './styles.module.scss'

export const NavbarSearch = () => {
  const searchInputRef = useRef(null)
  const searchButtonRef = useRef(null)

  const handleCloseSearch = useCallback((e: MouseEvent) => {
    if (e.target === searchInputRef.current) return
    if (e.target === searchButtonRef.current) return
    dispatchOpenSearch(false)
  }, [])

  useEffect(() => {
    document.addEventListener('click', handleCloseSearch)
    return () => document.removeEventListener('click', handleCloseSearch)
  }, [handleCloseSearch])

  return (
    <nav className={S.container}>
      <input className={S.searchInput} ref={searchInputRef} placeholder="O que você está buscando" autoFocus></input>

      <button className={S.searchButton} ref={searchButtonRef} aria-label="button-search">
        <BsSearch size={20} />
      </button>
    </nav>
  )
}
