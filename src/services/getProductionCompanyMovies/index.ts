import { getProductionCompanyMoviesProps } from '@/@types'
import { getDiscoverMovie } from '../getDiscoverMovie'

export async function getProductionCompanyMovies({ page, idCompany }: getProductionCompanyMoviesProps) {
  const results = await getDiscoverMovie({ page, vote: '', idCompany })
  return results
}
