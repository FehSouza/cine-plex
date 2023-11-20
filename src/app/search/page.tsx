import { Department } from '@/app/_components'
import { getSearch } from '@/services'
import S from './styles.module.scss'

interface SearchProps {
  searchParams: {
    q: string
    page: string
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
