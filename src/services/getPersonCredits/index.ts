import { PersonCredits } from '@/@types'
import { MOCK_GET_PERSON_CREDITS } from '@/mocks'
import { HttpResponse, http } from 'msw'
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

export const mockGetPersonCredits = http.get('https://api.themoviedb.org/3/person/:id/movie_credits', () =>
  HttpResponse.json(MOCK_GET_PERSON_CREDITS)
)
