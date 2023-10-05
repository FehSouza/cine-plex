'use client'

import { Cast, Crew, MovieCredits } from '@/@types'
import { DICTIONARY_CREW_DEPARTMENT } from '@/dictionary'
import { useState } from 'react'
import TeamCard from '../TeamCard'
import S from './styles.module.scss'

interface TeamTabProps {
  credits: MovieCredits
}

export const TeamTab = ({ credits }: TeamTabProps) => {
  const search = window.location.search
  const [tabActive, setTabActive] = useState(search ? search.replace('?q=', '') : 'cast')

  const setCast = new Set()
  const setCrew = new Set()

  const removeDuplicates = ({ item, set }: { item: Cast | Crew; set: Set<unknown> }) => {
    const duplicated = set.has(item.id)
    set.add(item.id)
    return !duplicated
  }

  const castList = credits.cast.filter((cast) => removeDuplicates({ item: cast, set: setCast }))
  const crewList = credits.crew.filter((crew) => removeDuplicates({ item: crew, set: setCrew }))

  const crewListSorted = crewList.sort(function (a, b) {
    if (a.job < b.job) return -1
    if (a.job > b.job) return 1
    return 0
  })

  let departments = [] as string[]

  crewListSorted.forEach((item) => {
    const depart = item.department
    if (!departments.includes(depart)) departments.push(depart)
  })

  const crewListFormatted = departments.sort().map((depart) => {
    const filter = crewListSorted.filter((item) => item.department === depart)
    return [depart, filter]
  })

  const handleSelectTab = (tabName: string) => {
    setTabActive(tabName)
    window.scrollTo({ top: 0, behavior: 'smooth' })

    const currentURL = new URL(window.location.href)
    currentURL.searchParams.set('q', tabName)

    history.pushState(null, '', tabName === 'cast' ? currentURL.pathname : currentURL.href)
  }

  return (
    <>
      <section className={[S.container, S.containerListNames].join(' ')}>
        <button className={[S.listNameTab, `${tabActive === 'cast' && S.active}`].join(' ')} onClick={() => handleSelectTab('cast')}>
          Elenco <span className={S.listQuant}>{`(${castList.length})`}</span>
        </button>

        <button className={[S.listNameTab, `${tabActive === 'crew' && S.active}`].join(' ')} onClick={() => handleSelectTab('crew')}>
          Equipe Técnica <span className={S.listQuant}>{`(${crewList.length})`}</span>
        </button>

        <button className={[S.listNameTab, `${tabActive === 'all' && S.active}`].join(' ')} onClick={() => handleSelectTab('all')}>
          Todos <span className={S.listQuant}>{`(${castList.length + crewList.length})`}</span>
        </button>
      </section>

      <section className={[S.container, S.containerLists].join(' ')}>
        {(tabActive === 'cast' || tabActive === 'all') && (
          <div className={S.listContent}>
            {tabActive === 'all' && <h2 className={S.listName}>Elenco</h2>}

            <ul className={S.listWrapper}>
              {castList.map((item) => {
                const id = item.id
                const image = item.profile_path
                const name = item.name
                const subName = item.character

                return <TeamCard key={`cast-${id}`} id={id} image={image} name={name} subName={subName} />
              })}
            </ul>
          </div>
        )}

        {tabActive === 'all' && <hr className={S.division} />}

        {(tabActive === 'crew' || tabActive === 'all') && (
          <div className={S.listContent}>
            {tabActive === 'all' && <h2 className={S.listName}>Equipe Técnica</h2>}

            {crewListFormatted.map((depart) => {
              const name = depart[0] as keyof typeof DICTIONARY_CREW_DEPARTMENT
              const list = depart[1] as Crew[]

              return (
                <div key={`department-${name}`} className={S.listDepart}>
                  <h3 className={S.departName}>
                    {DICTIONARY_CREW_DEPARTMENT[name] ? DICTIONARY_CREW_DEPARTMENT[name] : name}
                    <span className={S.listDepartQuant}>{`(${list.length})`}</span>
                  </h3>

                  <ul className={S.listWrapper}>
                    {list.map((item) => {
                      const id = item.id
                      const image = item.profile_path
                      const name = item.name
                      const subName = item.job

                      return <TeamCard key={`crew-${id}`} id={id} image={image} name={name} subName={subName} />
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </>
  )
}
