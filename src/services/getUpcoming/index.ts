import { Movie } from '@/@types'
import { optionsOneHour } from '../configs'

export async function getUpcoming() {
  const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=pt-BR&region=BR', optionsOneHour)
  const result = (await response.json()) as { results: Movie[] }
  const filteredList = result.results?.filter((result) => result.backdrop_path && result.poster_path)

  const sortByReleaseDate = filteredList?.sort((a, b) => {
    return a.release_date < b.release_date ? -1 : a.release_date > b.release_date ? 1 : 0
  })

  return sortByReleaseDate
}
