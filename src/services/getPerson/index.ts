import { Person } from '@/@types'
import { MOCK_GET_PERSON } from '@/mocks'
import { NEXT_PUBLIC_BASE_URL } from '@/utils'
import { HttpResponse, http } from 'msw'
import { optionsOneDay } from '../configs'

export async function getPerson(id: string) {
  const searchParams = new URLSearchParams({
    language: 'pt-BR',
  })

  const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/person/${id}?${searchParams.toString()}`, optionsOneDay)
  const result = (await response.json()) as Person
  return result
}

export const mockGetPerson = http.get(`${NEXT_PUBLIC_BASE_URL}/person/:id`, () => HttpResponse.json(MOCK_GET_PERSON))
