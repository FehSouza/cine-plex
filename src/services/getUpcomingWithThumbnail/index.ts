import { removeMovieWithoutThumbnail, sortByReleaseDateAsc } from '@/utils'
import { getUpcoming } from '../getUpcoming'

export async function getUpcomingWithThumbnail() {
  const { results } = await getUpcoming()
  const moviesList = removeMovieWithoutThumbnail(results)
  const sortedList = sortByReleaseDateAsc(moviesList)
  return sortedList
}
