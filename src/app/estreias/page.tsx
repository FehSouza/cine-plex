import { getUpcomingFull } from '@/services'
import { Metadata } from 'next'
import { Department } from '../../components'
import S from './styles.module.scss'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Filmes que estreiam em breve',
    description: 'Veja a lista dos filmes que estreiam em breve',
  }
}

export default async function Premieres() {
  const [upcoming] = await Promise.all([getUpcomingFull()])

  return (
    <main className={S.main}>
      <Department title="Filmes que estreiam em breve" movies={upcoming} upcoming />
    </main>
  )
}
