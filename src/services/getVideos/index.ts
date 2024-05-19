import { Videos } from '@/@types'
import { MOCK_GET_VIDEOS } from '@/mocks'
import { HttpResponse, http } from 'msw'
import { optionsOneDay } from '../configs'

export async function getVideos(id: string) {
  const searchParams = new URLSearchParams({
    language: 'pt-BR',
  })

  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?${searchParams.toString()}`, optionsOneDay)
  const results = (await response.json()) as Videos
  console.log(JSON.stringify(results, null, 2))
  return results
}

export const mockGetVideos = http.get('https://api.themoviedb.org/3/movie/:id/videos', () => HttpResponse.json(MOCK_GET_VIDEOS))
