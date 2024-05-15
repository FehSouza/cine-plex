import { getMoviesFullProps } from '@/@types'
import { sortByReleaseDate } from '@/utils'
import { getNowPlaying } from '../getNowPlaying'

export async function getNowPlayingFull({ page }: getMoviesFullProps) {
  const response = await getNowPlaying({ page })
  const sortedList = sortByReleaseDate(response.results)
  return { ...response, results: sortedList }
}
