'use client'

import { ListCredits } from '@/@types'
import { useState } from 'react'
import { CreditsFilters } from '../CreditsFilters'
import { CreditsTable } from '../CreditsTable'
import S from './styles.module.scss'

interface CreditsListProps {
  listCredits: ListCredits[]
  gender: number
}

export const CreditsList = ({ listCredits, gender }: CreditsListProps) => {
  const [filters, setFilters] = useState<string[]>([])
  const [orderBy, setOrderBy] = useState('Descendente')

  return (
    <div className={S.container}>
      <CreditsFilters listCredits={listCredits} filters={filters} setFilters={setFilters} orderBy={orderBy} setOrderBy={setOrderBy} />

      {listCredits.map((list) => (
        <CreditsTable key={`${list[0]}`} list={list} filters={filters} orderBy={orderBy} gender={gender} />
      ))}
    </div>
  )
}
