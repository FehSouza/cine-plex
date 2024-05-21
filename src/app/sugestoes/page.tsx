import { getPopularFull } from '@/services'
import { Metadata } from 'next'
import { Department } from '../../components'
import S from './styles.module.scss'

interface SuggestionsProps {
  params: {}
  searchParams: {
    page: string
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Nossas sugestões de Filmes',
    description: 'Veja a lista das nossas sugestões de filmes',
  }
}

export default async function Suggestions(props: SuggestionsProps) {
  const page = props.searchParams.page

  const [popular] = await Promise.all([getPopularFull({ page: page ?? '1' })])

  return (
    <main className={S.main}>
      <Department title="Nossas sugestões de Filmes" movies={popular} />
    </main>
  )
}
