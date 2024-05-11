import { Person } from '@/@types'
import { optionsOneDay } from '../configs'

export async function getPerson(id: string) {
  const response = await fetch(`https://api.themoviedb.org/3/person/${id}?language=pt-BR`, optionsOneDay)
  const result = (await response.json()) as Person
  return result
}
