'use client'

import { DICTIONARY_TEAM } from '@/dictionary'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import S from './styles.module.scss'

interface TeamTabsProps {
  id: string
}

export const TeamTabs = ({ id }: TeamTabsProps) => {
  const page = useSelectedLayoutSegment() as keyof typeof DICTIONARY_TEAM
  const pageName = DICTIONARY_TEAM[page]

  return !!id ? (
    <section data-testid="team-tabs" className={[S.container, S.containerListNames].join(' ')}>
      <Link
        data-testid="tab-cast"
        href={`/filme/${id}/elenco`}
        className={[S.listName, pageName === 'cast' ? S.active : ''].join(' ')}
        aria-selected={pageName === 'cast'}
      >
        Elenco
      </Link>

      <Link
        data-testid="tab-crew"
        href={`/filme/${id}/equipe-tecnica`}
        className={[S.listName, pageName === 'crew' ? S.active : ''].join(' ')}
        aria-selected={pageName === 'crew'}
      >
        Equipe Técnica
      </Link>

      <Link
        data-testid="tab-all"
        href={`/filme/${id}/elenco-e-equipe-tecnica`}
        className={[S.listName, pageName === 'all' ? S.active : ''].join(' ')}
        aria-selected={pageName === 'all'}
      >
        Todos
      </Link>
    </section>
  ) : null
}
