import { TeamCast, TeamCrew } from '@/app/_components'
import { getCreditsMovie } from '@/services'
import { castList, crewList } from '@/utils'
import S from './styles.module.scss'

interface TodosProps {
  params: { id: string }
}

export default async function Todos({ params }: TodosProps) {
  const id = params.id

  const [credits] = await Promise.all([getCreditsMovie(id)])
  const setCast = new Set()
  const setCrew = new Set()
  const listCast = castList({ credits, set: setCast })
  const listCrew = crewList({ credits, set: setCrew })

  return (
    <section className={S.container}>
      <h2 className={S.listName}>Elenco</h2>
      <TeamCast list={listCast} />

      <hr className={S.division} />

      <h2 className={S.listName}>Equipe Técnica</h2>
      <TeamCrew list={listCrew} />
    </section>
  )
}
