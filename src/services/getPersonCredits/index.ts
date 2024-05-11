import { PersonCredits } from '@/@types'
import { optionsOneDay } from '../configs'

export async function getPersonCredits(id: string) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?language=pt-BR`, optionsOneDay)
    const result = (await response.json()) as PersonCredits
    return result
  } catch (error) {
    console.log('function getPersonCredits with Error: ', error)
    return { id: id, cast: [], crew: [] }
  }
}
