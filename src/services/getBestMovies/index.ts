import { Movie } from '@/@types'
import { optionsOneDay } from '../configs'

export async function getBestMovies() {
  const response = await fetch(
    'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&region=BR&sort_by=popularity.desc&vote_average.gte=8.5',
    optionsOneDay
  )
  const result = (await response.json()) as { results: Movie[] }
  const filteredList = result.results?.filter(
    (res) => res.id && res.title && res.backdrop_path && res.poster_path && res.overview && res.vote_average
  )

  return filteredList
}
