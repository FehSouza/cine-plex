import { FullMovie } from '@/@types'
import { MOCK_GET_UPCOMING_PAGE_1 } from '@/mocks'
import { NEXT_PUBLIC_BASE_URL } from '@/utils'
import { HttpResponse, http } from 'msw'
import { optionsOneHour } from '../configs'

const endpoint = `${NEXT_PUBLIC_BASE_URL}/movie/upcoming`

export async function getUpcoming() {
  const searchParams = new URLSearchParams({
    language: 'pt-BR',
    region: 'BR',
  })

  const response = await fetch(`${endpoint}?${searchParams.toString()}`, optionsOneHour)
  const result = (await response.json()) as FullMovie
  return result
}

export const mockGetUpcoming = http.get(endpoint, () => HttpResponse.json(MOCK_GET_UPCOMING_PAGE_1))
