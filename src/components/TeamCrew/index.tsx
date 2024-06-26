import { Crew } from '@/@types'
import { DICTIONARY_CREW_DEPARTMENT } from '@/dictionary'
import { TeamCard } from '../TeamCard'
import S from './styles.module.scss'

interface TeamCrewProps {
  list: (string | Crew[])[][]
}

export const TeamCrew = ({ list }: TeamCrewProps) => {
  return (
    <>
      {list?.map((item) => {
        const name = item[0] as keyof typeof DICTIONARY_CREW_DEPARTMENT
        const list = item[1] as Crew[]

        return (
          <div data-testid={`team-crew-${name}`} key={`team-crew-${name}`} className={S.listDepart}>
            <h3 data-testid={`team-crew-${name}-title`} className={S.departName}>
              {DICTIONARY_CREW_DEPARTMENT[name] ? DICTIONARY_CREW_DEPARTMENT[name] : name}
            </h3>

            <ul className={S.listWrapper}>
              {list?.map((item) => {
                const id = item.id
                const image = item.profile_path
                const name = item.name
                const subName = item.job
                const gender = item.gender

                return <TeamCard key={`crew-${id}`} id={id} image={image} name={name} subName={subName} gender={gender} />
              })}
            </ul>
          </div>
        )
      })}
    </>
  )
}
