import { removeMovieWithoutThumbnail } from '@/utils'
import { getPopular } from '../getPopular'

export async function getPopularWithThumbnail() {
  const { results } = await getPopular()
  const moviesList = removeMovieWithoutThumbnail(results)
  return moviesList
}
