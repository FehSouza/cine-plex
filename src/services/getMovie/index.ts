import { MovieDetail } from '@/@types'
import { MOCK_GET_MOVIE } from '@/mocks'
import { HttpResponse, http } from 'msw'
import { optionsOneDay } from '../configs'

export async function getMovie(id: string) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=pt-BR`, optionsOneDay)
  const result = (await response.json()) as MovieDetail
  return result
}

export const mockGetMovie = http.get('https://api.themoviedb.org/3/movie/:id', () => HttpResponse.json(MOCK_GET_MOVIE))
