import { PersonCredits } from '@/@types'
import { MOCK_GET_PERSON_CREDITS } from '@/mocks'
import { NEXT_PUBLIC_BASE_URL } from '@/utils'
import { HttpResponse, http } from 'msw'
import { optionsOneDay } from '../configs'

export async function getPersonCredits(id: string) {
  try {
    const searchParams = new URLSearchParams({
      language: 'pt-BR',
    })

    const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/person/${id}/movie_credits?${searchParams.toString()}`, optionsOneDay)
    const result = (await response.json()) as PersonCredits
    return result
  } catch (error) {
    console.log('function getPersonCredits with Error: ', error)
    return { id: id, cast: [], crew: [] }
  }
}

export const mockGetPersonCredits = http.get(`${NEXT_PUBLIC_BASE_URL}/person/:id/movie_credits`, () =>
  HttpResponse.json(MOCK_GET_PERSON_CREDITS)
)
