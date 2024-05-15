import { removeMovieWithoutInfos } from '@/utils'
import { getBestMovies } from '../getBestMovies'

export async function getBestMoviesWithInfos() {
  const { results } = await getBestMovies()
  const moviesList = removeMovieWithoutInfos(results)
  return moviesList
}
