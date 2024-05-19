import { getMoviesFullProps } from '@/@types'
import { sortByReleaseDateDesc } from '@/utils'
import { getNowPlaying } from '../getNowPlaying'

export async function getNowPlayingFull({ page }: getMoviesFullProps) {
  const response = await getNowPlaying({ page })
  const sortedList = sortByReleaseDateDesc(response.results)
  return { ...response, results: sortedList }
}
