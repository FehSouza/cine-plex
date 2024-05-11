import { FullMovie, getFullMoviesProps } from '@/@types'
import { optionsOneHour } from '../configs'

export async function getFullNowPlaying({ page }: getFullMoviesProps) {
  const pageFormatted = Number(page) > 500 ? 500 : page
  const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=${pageFormatted}`, optionsOneHour)
  const result = (await response.json()) as FullMovie
  const sortByReleaseDate = result?.results?.sort((a, b) => {
    return a.release_date > b.release_date ? -1 : a.release_date < b.release_date ? 1 : 0
  })

  return { ...result, results: sortByReleaseDate }
}
