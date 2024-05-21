import { FullMovie } from '@/@types'
import { MOCK_GET_NOW_PLAYING_PAGE_1, MOCK_GET_NOW_PLAYING_PAGE_2 } from '@/mocks'
import { NEXT_PUBLIC_BASE_URL, clamp } from '@/utils'
import { HttpResponse, http } from 'msw'
import { optionsOneHour } from '../configs'

const endpoint = `${NEXT_PUBLIC_BASE_URL}/movie/now_playing`

export async function getNowPlaying(props: { page: string } = { page: '1' }) {
  const page = clamp(Number(props.page), 1, 500)

  const searchParams = new URLSearchParams()
  searchParams.append('language', 'pt-BR')
  searchParams.append('page', String(page))

  const response = await fetch(`${endpoint}?${searchParams.toString()}`, optionsOneHour)
  const result = (await response.json()) as FullMovie
  return result
}

export const mockGetNowPlaying = http.get(endpoint, ({ request }) => {
  const searchParams = new URLSearchParams(request.url)
  const page = searchParams.get('page')
  if (page === '2') return HttpResponse.json(MOCK_GET_NOW_PLAYING_PAGE_2)
  return HttpResponse.json(MOCK_GET_NOW_PLAYING_PAGE_1)
})
