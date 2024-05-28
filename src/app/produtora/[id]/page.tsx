import PageNotFound from '@/app/not-found'
import { Department } from '@/components'
import { getProductionCompanyMovies } from '@/services'
import { Metadata } from 'next'
import S from './styles.module.scss'

interface ProductionCompanyProps {
  params: { id: string }
  searchParams: { page: string }
}

export async function generateMetadata({ params, searchParams }: ProductionCompanyProps): Promise<Metadata> {
  const [id] = params.id.split('-')
  const name = params.id.replace(`${id}-`, '').replace(/-/g, ' ')
  const page = searchParams.page

  const productionCompanyMovies = await getProductionCompanyMovies({ page: page ?? '1', idCompany: id })
  if (!productionCompanyMovies?.results?.length) return { title: 'Page Not Found' }

  return {
    title: `Produtora ${name}`,
    description: `Veja filmes da produtora ${name}`,
  }
}

export default async function ProductionCompany({ params, searchParams }: ProductionCompanyProps) {
  const [id] = params.id.split('-')
  const name = params.id.replace(`${id}-`, '').replace(/-/g, ' ')
  const page = searchParams.page

  const productionCompanyMovies = await getProductionCompanyMovies({ page: page ?? '1', idCompany: id })
  if (!productionCompanyMovies?.results?.length) return <PageNotFound />

  return (
    <main className={S.main}>
      <Department title={`Produtora ${name}`} movies={productionCompanyMovies} />
    </main>
  )
}
