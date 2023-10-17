'use client'

import { PersonCast, PersonCrew } from '@/@types'
import { DICTIONARY_CREW_DEPARTMENT } from '@/dictionary'
import Link from 'next/link'
import { useState } from 'react'
import { BsSortNumericDown, BsSortNumericDownAlt } from 'react-icons/bs'
import { IoIosArrowDown } from 'react-icons/io'
import S from './styles.module.scss'

interface CreditsListProps {
  listCredits: (
    | string
    | Record<
        string,
        {
          year: number
          date: string
          info: PersonCast | PersonCrew
        }[]
      >
  )[][]
  id: string
  gender: number
}

export const CreditsList = ({ listCredits, id, gender }: CreditsListProps) => {
  const [filters, setFilters] = useState<string[]>([''])
  const [orderBy, setOrderBy] = useState('des')

  const handleFilter = (name: string) => {
    if (name === 'all') return setFilters([''])
    if (filters.includes(name)) return setFilters((prev) => prev.filter((item) => item !== name))
    setFilters((prev) => [...prev, name])
  }

  return (
    <div className={S.content}>
      <div className={S.filterContainer}>
        {filters.length > 1 && (
          <button className={S.filterTitle} onClick={() => handleFilter('all')}>
            {filters.length === 2 ? 'Limpar seleção' : 'Limpar seleções'}
          </button>
        )}

        <div className={S.filterContent}>
          <div className={S.filterTitle}>
            <span>Departamentos</span>
            <IoIosArrowDown size={12} className={S.filterArrow} />
          </div>

          <ul className={S.filterWrapper}>
            {listCredits.map((list) => {
              const listName = String(list[0]) as keyof typeof DICTIONARY_CREW_DEPARTMENT

              return (
                <li
                  className={[S.filterItem, filters.includes(listName) ? S.active : ''].join(' ')}
                  key={`button-${list}`}
                  onClick={() => handleFilter(listName)}
                >
                  {DICTIONARY_CREW_DEPARTMENT[listName]}
                </li>
              )
            })}
          </ul>
        </div>

        <div className={S.filterContent}>
          <div className={S.filterTitle}>
            <span>Ordenação</span>
            <IoIosArrowDown size={12} className={S.filterArrow} />
          </div>

          <ul className={S.filterWrapper}>
            <li className={[S.filterItem, orderBy === 'asc' ? S.active : ''].join(' ')} onClick={() => setOrderBy('asc')}>
              <BsSortNumericDown size={20} /> Ordem Ascendente
            </li>
            <li className={[S.filterItem, orderBy === 'des' ? S.active : ''].join(' ')} onClick={() => setOrderBy('des')}>
              <BsSortNumericDownAlt size={20} /> Ordem Descendente
            </li>
          </ul>
        </div>
      </div>

      {listCredits.map((list) => {
        const listName = String(list[0]) as keyof typeof DICTIONARY_CREW_DEPARTMENT
        const listYears = Object.entries(list[1])

        if (!filters.includes(listName) && filters.length !== 1) return

        return (
          <div key={`${id}-${listName}`} className={S.credits}>
            <h2 className={S.title}>{DICTIONARY_CREW_DEPARTMENT[listName]}</h2>

            <ul className={[S.creditsList, orderBy === 'asc' ? S.asc : ''].join(' ')}>
              {listYears.map((item) => {
                const year = item[0]
                const infos = item[1] as { year: number; date: string; info: PersonCast | PersonCrew }[]

                return (
                  <li className={S.creditItem} key={`${id}-${listName}-${year}`}>
                    <span className={S.year}>{year}</span>

                    <div className={S.moviesWrapper}>
                      {infos.map((movie, index) => {
                        const idMovie = movie.info.id
                        const name = movie.info.title ?? movie.info.name
                        const subName = movie.info.character ?? movie.info.job ?? ''
                        const subNameFormatted = subName
                          .replace('(voice)', '(voz)')
                          .replace('(uncredited)', '(sem créditos)')
                          .replace('(archive footage)', '(imagens de arquivo)')
                          .replace('(archival footage)', '(imagens de arquivo)')
                          .replace('Self', `${gender === 1 ? 'ela própria' : 'ele próprio'}`)

                        const subNameText = subNameFormatted ? `como ${subNameFormatted}` : ''

                        return (
                          <Link className={S.movieLink} href={`/filme/${idMovie}`} key={`${id}-${listName}-${year}-${idMovie}-${index}`}>
                            <span className={S.movieName}>{name}</span>
                            <span className={S.movieText}>{subNameText}</span>
                          </Link>
                        )
                      })}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
