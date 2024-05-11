import { MovieDetail } from '@/@types'
import { optionsOneDay } from '../configs'

export async function getMovie(id: string) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=pt-BR`, optionsOneDay)
  const result = (await response.json()) as MovieDetail
  return result
}
