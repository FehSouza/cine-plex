import { getFullUpcoming } from '@/services'
import { Department } from '../_components'
import S from './styles.module.scss'

interface PremieresProps {
  params: {}
  searchParams: {
    page: string
  }
}

export default async function Premieres(props: PremieresProps) {
  const page = props.searchParams.page

  const [upcoming] = await Promise.all([getFullUpcoming({ page: page ?? '1' })])

  return (
    <main className={S.main}>
      <Department title="Filmes que estreiam em breve" movies={upcoming} upcoming />
    </main>
  )
}
