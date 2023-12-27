'use client'

import { FullMovie, FullPerson } from '@/@types'
import { dispatchOpenSearch } from '@/states/openSearch'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { BsImage, BsPerson, BsSearch } from 'react-icons/bs'
import { TMDBPosterLoader } from '../Carousel'
import S from './styles.module.scss'

interface NavbarSearchProps {
  isMobile?: boolean
}

export const NavbarSearch = ({ isMobile }: NavbarSearchProps) => {
  const router = useRouter()

  const inputRef = useRef(null)
  const buttonRef = useRef(null)
  const resultsRef = useRef(null)
  const resultsTitleRef1 = useRef(null)
  const resultsTitleRef2 = useRef(null)
  let timerDebounce = useRef<NodeJS.Timeout | undefined>(undefined)

  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [movieSuggestions, setMovieSuggestions] = useState<FullMovie>()
  const [personSuggestions, setPersonSuggestions] = useState<FullPerson>()

  const handleCloseSearch = useCallback((e: MouseEvent) => {
    if (e.target === inputRef.current) return
    if (e.target === buttonRef.current) return
    if (e.target === resultsRef.current) return
    if (e.target === resultsTitleRef1.current) return
    if (e.target === resultsTitleRef2.current) return
    dispatchOpenSearch(false)
  }, [])

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
      const response = await fetch(`/api/search?q=${value}`)
      const result = await response.json()
      setLoading(false)
      setMovieSuggestions(result.movies)
      setPersonSuggestions(result.people)
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
          ref={inputRef}
          placeholder="O que você está buscando?"
          autoFocus
          value={query}
          onChange={(e) => handleSearchSuggestions(e)}
          onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
        />

        <button className={S.searchButton} ref={buttonRef} aria-label="button-search" onClick={handleSearch}></button>

        <BsSearch size={20} />
      </nav>

      {query && (
        <div className={S.resultsContent} ref={resultsRef}>
          <div className={S.resultsWrapper}>
            <span className={S.subTitle} ref={resultsTitleRef1}>
              Filmes sugeridos
            </span>

            <ul className={S.list}>
              {!movieSuggestions?.results.length && loading && (
                <li className={S.item}>
                  <AiOutlineLoading3Quarters size={20} />
                </li>
              )}

              {!movieSuggestions?.results.length && !loading && (
                <li className={S.item}>
                  <span>Sem sugestões de filmes para o termo digitado</span>
                </li>
              )}

              {movieSuggestions?.results.slice(0, isMobile ? 4 : 5).map((suggestion) => {
                const id = suggestion.id
                const name = suggestion.title
                const image = suggestion.poster_path

                return (
                  <li className={S.item} key={id}>
                    <a className={S.link} href={`/filme/${id}`}>
                      <div className={S.ImageWrapper}>
                        {image && (
                          <Image
                            className={S.image}
                            loader={TMDBPosterLoader}
                            src={image}
                            alt={`Poster do Filme ${name}`}
                            fill
                            sizes="200w"
                          />
                        )}
                        {!image && <BsImage className={S.imagePerson} />}
                      </div>
                      {name}
                    </a>
                  </li>
                )
              })}
            </ul>

            <span className={[S.subTitle, S.subTitleBottom].join(' ')} ref={resultsTitleRef2}>
              Pessoas sugeridas
            </span>

            <ul className={S.list}>
              {!personSuggestions?.results.length && loading && (
                <li className={S.item}>
                  <AiOutlineLoading3Quarters size={20} />
                </li>
              )}

              {!personSuggestions?.results.length && !loading && (
                <li className={S.item}>
                  <span>Sem sugestões de pessoas para o termo digitado</span>
                </li>
              )}

              {personSuggestions?.results.slice(0, isMobile ? 4 : 5).map((suggestion) => {
                const id = suggestion.id
                const name = suggestion.name
                const image = suggestion.profile_path

                return (
                  <li className={S.item} key={id}>
                    <a className={S.link} href={`/pessoa/${id}`}>
                      <div className={S.ImageWrapper}>
                        {image && (
                          <Image className={S.image} loader={TMDBPosterLoader} src={image} alt={`Imagem de ${name}`} fill sizes="200w" />
                        )}
                        {!image && <BsPerson size={20} className={S.imagePerson} />}
                      </div>
                      {name}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
