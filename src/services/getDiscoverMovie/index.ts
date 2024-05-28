import { FullMovie } from '@/@types'
import { MOCK_GET_DISCOVER_MOVIES } from '@/mocks'
import { NEXT_PUBLIC_BASE_URL, clamp } from '@/utils'
import { HttpResponse, http } from 'msw'
import { optionsOneDay } from '../configs'

const endpoint = `${NEXT_PUBLIC_BASE_URL}/discover/movie`

export async function getDiscoverMovie(props: { page: string; vote: string; idCompany: string }) {
  const page = clamp(Number(props.page), 1, 500)

  const searchParams = new URLSearchParams({
    include_adult: 'false',
    include_video: 'false',
    language: 'pt-BR',
    page: String(page),
    region: 'BR',
    sort_by: props.vote ? 'popularity.desc' : 'vote_average.desc',
    'vote_average.gte': props.vote,
    with_companies: props.idCompany,
  })

  const response = await fetch(`${endpoint}?${searchParams.toString()}`, optionsOneDay)
  const result = (await response.json()) as FullMovie
  return result
}

export const mockGetDiscoverMovie = http.get(endpoint, () => HttpResponse.json(MOCK_GET_DISCOVER_MOVIES))
