import { FullMovie } from '@/@types'
import { MOCK_GET_UPCOMING_PAGE_1 } from '@/mocks'
import { HttpResponse, http } from 'msw'
import { optionsOneHour } from '../configs'

const URL = 'https://api.themoviedb.org/3/movie/upcoming'

export async function getUpcoming() {
  const searchParams = new URLSearchParams({
    language: 'pt-BR',
    region: 'BR',
  })

  const response = await fetch(`${URL}?${searchParams.toString()}`, optionsOneHour)
  const result = (await response.json()) as FullMovie
  return result
}

export const mockGetUpcoming = http.get(URL, () => HttpResponse.json(MOCK_GET_UPCOMING_PAGE_1))
