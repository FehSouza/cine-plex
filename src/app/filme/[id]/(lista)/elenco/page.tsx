import { TeamCast } from '@/app/_components'
import { getCreditsMovie } from '@/services'
import { castList } from '@/utils'
import S from './styles.module.scss'

interface ElencoProps {
  params: { id: string }
}

export default async function Elenco({ params }: ElencoProps) {
  const id = params.id

  const [credits] = await Promise.all([getCreditsMovie(id)])
  const list = castList({ credits })

  return (
    <section className={S.container}>
      {!!list?.length && <TeamCast list={list} />}
      {!list?.length && <span>Não possuímos uma lista de elenco para este filme</span>}
    </section>
  )
}
