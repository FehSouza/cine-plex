import { Person } from '@/@types'
import { MOCK_GET_PERSON } from '@/mocks'
import { HttpResponse, http } from 'msw'
import { optionsOneDay } from '../configs'

export async function getPerson(id: string) {
  const response = await fetch(`https://api.themoviedb.org/3/person/${id}?language=pt-BR`, optionsOneDay)
  const result = (await response.json()) as Person
  return result
}

export const mockGetPerson = http.get('https://api.themoviedb.org/3/person/:id', () => HttpResponse.json(MOCK_GET_PERSON))
