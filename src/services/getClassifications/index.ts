import { Certifications } from '@/@types'
import { MOCK_GET_CLASSIFICATIONS } from '@/mocks/getClassifications'
import { NEXT_PUBLIC_BASE_URL } from '@/utils'
import { HttpResponse, http } from 'msw'
import { optionsOneDay } from '../configs'

export async function getClassifications(id: string) {
  const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/movie/${id}/release_dates`, optionsOneDay)
  const result = (await response.json()) as Certifications
  return result
}

export const mockGetClassifications = http.get(`${NEXT_PUBLIC_BASE_URL}/movie/:id/release_dates`, () =>
  HttpResponse.json(MOCK_GET_CLASSIFICATIONS)
)
