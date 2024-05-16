import { FullMovie } from '@/@types'
import { MOCK_GET_RECOMMENDATIONS } from '@/mocks'
import { HttpResponse, http } from 'msw'
import { optionsOneDay } from '../configs'

export async function getRecommendations(id: string) {
  const searchParams = new URLSearchParams({
    language: 'pt-BR',
    page: '1',
  })

  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?${searchParams.toString()}`, optionsOneDay)
  const result = (await response.json()) as FullMovie
  return result
}

export const mockGetRecommendations = http.get('https://api.themoviedb.org/3/movie/:id/recommendations', () =>
  HttpResponse.json(MOCK_GET_RECOMMENDATIONS)
)
