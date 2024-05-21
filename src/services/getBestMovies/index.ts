import { FullMovie } from '@/@types'
import { MOCK_GET_BEST_MOVIES } from '@/mocks'
import { NEXT_PUBLIC_BASE_URL } from '@/utils'
import { HttpResponse, http } from 'msw'
import { optionsOneDay } from '../configs'

const endpoint = `${NEXT_PUBLIC_BASE_URL}/discover/movie`

export async function getBestMovies() {
  const searchParams = new URLSearchParams({
    include_adult: 'false',
    include_video: 'false',
    language: 'pt-BR',
    page: '1',
    region: 'BR',
    sort_by: 'popularity.desc',
    'vote_average.gte': '8.5',
  })

  const response = await fetch(`${endpoint}?${searchParams.toString()}`, optionsOneDay)
  const result = (await response.json()) as FullMovie
  return result
}

export const mockGetBestMovies = http.get(endpoint, () => HttpResponse.json(MOCK_GET_BEST_MOVIES))
