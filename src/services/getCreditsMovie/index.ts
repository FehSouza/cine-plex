import { MovieCredits } from '@/@types'
import { MOCK_GET_CREDITS_MOVIE } from '@/mocks'
import { HttpResponse, http } from 'msw'
import { optionsOneDay } from '../configs'

export async function getCreditsMovie(id: string) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=bt-BR`, optionsOneDay)
  const result = (await response.json()) as MovieCredits
  return result
}

export const mockGetCreditsMovie = http.get('https://api.themoviedb.org/3/movie/:id/credits', () =>
  HttpResponse.json(MOCK_GET_CREDITS_MOVIE)
)
