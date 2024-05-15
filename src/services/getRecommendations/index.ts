import { Movie } from '@/@types'
import { MOCK_GET_RECOMMENDATIONS } from '@/mocks'
import { HttpResponse, http } from 'msw'
import { optionsOneDay } from '../configs'

export async function getRecommendations(id: string) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=pt-BR&page=1`, optionsOneDay)
  const result = (await response.json()) as { results: Movie[] }
  const filteredList = result.results?.filter((result) => result.backdrop_path && result.poster_path)
  return filteredList
}

export const mockGetRecommendations = http.get('https://api.themoviedb.org/3/movie/:id/recommendations', () =>
  HttpResponse.json(MOCK_GET_RECOMMENDATIONS)
)
