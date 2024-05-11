import { MovieCredits } from '@/@types'
import { optionsOneDay } from '../configs'

export async function getCreditsMovie(id: string) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=bt-BR`, optionsOneDay)
  const result = (await response.json()) as MovieCredits
  return result
}
