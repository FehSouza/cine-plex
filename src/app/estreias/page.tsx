import { getFullUpcoming } from '@/services'
import { Department } from '../../components'
import S from './styles.module.scss'

export default async function Premieres() {
  const [upcoming] = await Promise.all([getFullUpcoming()])

  return (
    <main className={S.main}>
      <Department title="Filmes que estreiam em breve" movies={upcoming} upcoming />
    </main>
  )
}
