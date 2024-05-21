import { FullMovie } from '@/@types'
import { MOCK_GET_RECOMMENDATIONS } from '@/mocks'
import { NEXT_PUBLIC_BASE_URL } from '@/utils'
import { HttpResponse, http } from 'msw'
import { optionsOneDay } from '../configs'

export async function getRecommendations(id: string) {
  const searchParams = new URLSearchParams({
    language: 'pt-BR',
    page: '1',
  })

  const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/movie/${id}/recommendations?${searchParams.toString()}`, optionsOneDay)
  const result = (await response.json()) as FullMovie
  return result
}

export const mockGetRecommendations = http.get(`${NEXT_PUBLIC_BASE_URL}/movie/:id/recommendations`, () =>
  HttpResponse.json(MOCK_GET_RECOMMENDATIONS)
)
