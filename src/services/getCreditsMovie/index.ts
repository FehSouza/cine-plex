import { MovieCredits } from '@/@types'
import { MOCK_GET_CREDITS_MOVIE } from '@/mocks'
import { NEXT_PUBLIC_BASE_URL } from '@/utils'
import { HttpResponse, http } from 'msw'
import { optionsOneDay } from '../configs'

export async function getCreditsMovie(id: string) {
  const searchParams = new URLSearchParams({
    language: 'pt-BR',
  })

  const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/movie/${id}/credits?${searchParams.toString()}`, optionsOneDay)
  const result = (await response.json()) as MovieCredits
  return result
}

export const mockGetCreditsMovie = http.get(`${NEXT_PUBLIC_BASE_URL}/movie/:id/credits`, () => HttpResponse.json(MOCK_GET_CREDITS_MOVIE))
