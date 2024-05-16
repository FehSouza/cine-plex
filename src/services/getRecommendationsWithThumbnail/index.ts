import { removeMovieWithoutThumbnail } from '@/utils'
import { getRecommendations } from '../getRecommendations'

export async function getRecommendationsWithThumbnail(id: string) {
  const { results } = await getRecommendations(id)
  const moviesList = removeMovieWithoutThumbnail(results)
  return moviesList
}
