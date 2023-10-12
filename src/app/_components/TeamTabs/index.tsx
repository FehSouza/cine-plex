'use client'

import { DICTIONARY_TEAM } from '@/dictionary'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import S from './styles.module.scss'

interface TeamTabsProps {
  id: string
}

export default function TeamTabs({ id }: TeamTabsProps) {
  const page = useSelectedLayoutSegment() as keyof typeof DICTIONARY_TEAM
  const pageName = DICTIONARY_TEAM[page]

  return (
    <section className={[S.container, S.containerListNames].join(' ')}>
      <Link href={`/filme/${id}/elenco`} className={[S.listName, pageName === 'cast' ? S.active : ''].join(' ')}>
        Elenco
      </Link>

      <Link href={`/filme/${id}/equipe-tecnica`} className={[S.listName, pageName === 'crew' ? S.active : ''].join(' ')}>
        Equipe Técnica
      </Link>

      <Link href={`/filme/${id}/elenco-e-equipe-tecnica`} className={[S.listName, pageName === 'all' ? S.active : ''].join(' ')}>
        Todos
      </Link>
    </section>
  )
}
