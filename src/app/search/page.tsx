import { Department } from '@/components'
import { getSearch } from '@/services'
import { Metadata } from 'next'
import S from './styles.module.scss'

interface SearchProps {
  searchParams: {
    q: string
    page: string
  }
}

export async function generateMetadata({ searchParams }: SearchProps): Promise<Metadata> {
  const query = searchParams.q

  return {
    title: query,
    description: `Veja o resultado de filmes para a busca de ${query}`,
  }
}

export default async function Search({ searchParams }: SearchProps) {
  const query = searchParams.q
  const page = searchParams.page

  const result = await getSearch({ query, page: page ?? '1' })

  const titleFormatted = decodeURIComponent(query)

  return (
    <main className={S.main}>
      <Department title={titleFormatted} movies={result} />
    </main>
  )
}
