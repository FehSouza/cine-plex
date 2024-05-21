import { Videos } from '@/@types'
import { MOCK_GET_VIDEOS } from '@/mocks'
import { NEXT_PUBLIC_BASE_URL } from '@/utils'
import { HttpResponse, http } from 'msw'
import { optionsOneDay } from '../configs'

export async function getVideos(id: string) {
  const searchParams = new URLSearchParams({
    language: 'pt-BR',
  })

  const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/movie/${id}/videos?${searchParams.toString()}`, optionsOneDay)
  const results = (await response.json()) as Videos
  return results
}

export const mockGetVideos = http.get(`${NEXT_PUBLIC_BASE_URL}/movie/:id/videos`, () => HttpResponse.json(MOCK_GET_VIDEOS))
