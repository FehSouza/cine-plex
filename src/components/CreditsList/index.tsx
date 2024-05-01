'use client'

import { PersonCast, PersonCrew } from '@/@types'
import { DICTIONARY_CREW_DEPARTMENT } from '@/dictionary'
import { useState } from 'react'
import { BsSortNumericDown, BsSortNumericDownAlt } from 'react-icons/bs'
import { IoIosArrowDown } from 'react-icons/io'
import { CreditsTable } from '../CreditsTable'
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
  gender: number
}

export const CreditsList = ({ listCredits, gender }: CreditsListProps) => {
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
          <button className={[S.filterTitle, S.clearButton].join(' ')} onClick={() => handleFilter('all')}>
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

      {listCredits.map((list) => (
        <CreditsTable key={`${list[0]}`} list={list} filters={filters} orderBy={orderBy} gender={gender} />
      ))}
    </div>
  )
}
