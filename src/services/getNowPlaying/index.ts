import { Movie } from '@/@types'
import { optionsOneHour } from '../configs'

export async function getNowPlaying() {
  const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=1', optionsOneHour)
  const result = (await response.json()) as { results: Movie[] }
  const filteredList = result.results?.filter((result) => result.backdrop_path && result.poster_path)
  const sortByReleaseDate = filteredList?.sort((a, b) => {
    return a.release_date > b.release_date ? -1 : a.release_date < b.release_date ? 1 : 0
  })

  return sortByReleaseDate
}
