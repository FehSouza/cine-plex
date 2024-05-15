import { removeMovieWithoutThumbnail, sortByReleaseDate } from '@/utils'
import { getNowPlaying } from '../getNowPlaying'

export async function getNowPlayingWithThumbnail() {
  const { results } = await getNowPlaying()
  const moviesList = removeMovieWithoutThumbnail(results)
  const sortedList = sortByReleaseDate(moviesList)
  return sortedList
}
