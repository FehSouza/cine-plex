import { Certifications } from '@/@types'
import { MOCK_GET_CLASSIFICATIONS } from '@/mocks/getClassifications'
import { HttpResponse, http } from 'msw'
import { optionsOneDay } from '../configs'

export async function getClassifications(id: string) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/release_dates`, optionsOneDay)
  const result = (await response.json()) as Certifications
  return result
}

export const mockGetClassifications = http.get('https://api.themoviedb.org/3/movie/:id/release_dates', () =>
  HttpResponse.json(MOCK_GET_CLASSIFICATIONS)
)
