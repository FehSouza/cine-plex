import { Watch } from '@/@types'
import { MOCK_GET_WATCH } from '@/mocks'
import { HttpResponse, http } from 'msw'
import { optionsOneDay } from '../configs'

export async function getWatch(id: string) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers`, optionsOneDay)
  const result = (await response.json()) as Watch
  return result
}

export const mockGetWatch = http.get('https://api.themoviedb.org/3/movie/:id/watch/providers', () => HttpResponse.json(MOCK_GET_WATCH))
