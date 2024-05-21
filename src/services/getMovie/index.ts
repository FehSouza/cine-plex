import { MovieDetail } from '@/@types'
import { MOCK_GET_MOVIE } from '@/mocks'
import { NEXT_PUBLIC_BASE_URL } from '@/utils'
import { HttpResponse, http } from 'msw'
import { optionsOneDay } from '../configs'

export async function getMovie(id: string) {
  const searchParams = new URLSearchParams({
    language: 'pt-BR',
  })

  const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/movie/${id}?${searchParams.toString()}`, optionsOneDay)
  const result = (await response.json()) as MovieDetail
  return result
}

export const mockGetMovie = http.get(`${NEXT_PUBLIC_BASE_URL}/movie/:id`, () => HttpResponse.json(MOCK_GET_MOVIE))
