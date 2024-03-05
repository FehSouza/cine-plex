import { TeamCrew } from '@/app/_components'
import { getCreditsMovie } from '@/services'
import { crewList } from '@/utils'
import S from './styles.module.scss'

interface EquipeProps {
  params: { id: string }
}

export default async function Equipe({ params }: EquipeProps) {
  const id = params.id

  const [credits] = await Promise.all([getCreditsMovie(id)])
  const setCrew = new Set()
  const list = crewList({ credits, set: setCrew })

  return (
    <section className={S.container}>
      {!!list && <TeamCrew list={list} />}
      {!list && <span>Não possuímos uma lista de equipe técnica para este filme</span>}
    </section>
  )
}
