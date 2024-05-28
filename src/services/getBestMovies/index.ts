import { removeMovieWithoutInfos } from '@/utils'
import { getDiscoverMovie } from '../getDiscoverMovie'

export async function getBestMovies() {
  const { results } = await getDiscoverMovie({ page: '1', vote: '8.5', idCompany: '' })
  const moviesList = removeMovieWithoutInfos(results)
  return moviesList
}
