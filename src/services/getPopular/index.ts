import { Movie } from '@/@types'
import { optionsOneHour } from '../configs'

export async function getPopular() {
  const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1&region=BR', optionsOneHour)
  const result = (await response.json()) as { results: Movie[] }
  const filteredList = result.results?.filter((result) => result.backdrop_path && result.poster_path)
  return filteredList
}
