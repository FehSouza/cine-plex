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
  const listCast = castList({ credits })
  const listCrew = crewList({ credits })

  return (
    <section className={S.container}>
      <h2 className={S.listName}>Elenco</h2>
      {!!listCast && <TeamCast list={listCast} />}
      {!listCast && <span>Não possuímos uma lista de elenco para este filme</span>}

      <hr className={S.division} />

      <h2 className={S.listName}>Equipe Técnica</h2>
      {!!listCrew && <TeamCrew list={listCrew} />}
      {!listCrew && <span>Não possuímos uma lista de equipe técnica para este filme</span>}
    </section>
  )
}
