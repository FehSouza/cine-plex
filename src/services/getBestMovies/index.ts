import { FullMovie } from '@/@types'
import { MOCK_GET_BEST_MOVIES } from '@/mocks'
import { HttpResponse, http } from 'msw'
import { optionsOneDay } from '../configs'

const URL = 'https://api.themoviedb.org/3/discover/movie'

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

  const response = await fetch(`${URL}?${searchParams.toString()}`, optionsOneDay)
  const result = (await response.json()) as FullMovie
  return result
}

export const mockGetBestMovies = http.get(URL, () => HttpResponse.json(MOCK_GET_BEST_MOVIES))
