'use client'

import { DICTIONARY_TEAM } from '@/dictionary'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { useState } from 'react'
import S from './styles.module.scss'

interface TeamTabsProps {
  id: string
}

export default function TeamTabs({ id }: TeamTabsProps) {
  const currentPage = useSelectedLayoutSegment() as keyof typeof DICTIONARY_TEAM
  const [active, setActive] = useState(DICTIONARY_TEAM[currentPage])

  return (
    <section className={[S.container, S.containerListNames].join(' ')}>
      <Link
        href={`/filme/${id}/elenco`}
        className={[S.listName, active === 'cast' ? S.active : ''].join(' ')}
        onClick={() => setActive('cast')}
      >
        Elenco
      </Link>

      <Link
        href={`/filme/${id}/equipe-tecnica`}
        className={[S.listName, active === 'crew' ? S.active : ''].join(' ')}
        onClick={() => setActive('crew')}
      >
        Equipe Técnica
      </Link>

      <Link
        href={`/filme/${id}/elenco-e-equipe-tecnica`}
        className={[S.listName, active === 'all' ? S.active : ''].join(' ')}
        onClick={() => setActive('all')}
      >
        Todos
      </Link>
    </section>
  )
}
