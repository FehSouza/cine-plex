import { TeamCrew } from '@/components'
import { getCreditsMovie } from '@/services'
import { crewList } from '@/utils'
import S from './styles.module.scss'

interface EquipeProps {
  params: { id: string }
}

export default async function Equipe({ params }: EquipeProps) {
  const id = params.id

  const [credits] = await Promise.all([getCreditsMovie(id)])
  const list = crewList({ credits })

  return (
    <section className={S.container}>
      {!!list?.length && <TeamCrew list={list} />}
      {!list?.length && <span>Não possuímos uma lista de equipe técnica para este filme</span>}
    </section>
  )
}
