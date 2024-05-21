import { FullMovie } from '@/@types'
import { MOCK_GET_SEARCH_QUERY_A, MOCK_GET_SEARCH_QUERY_ANY } from '@/mocks'
import { NEXT_PUBLIC_BASE_URL, clamp } from '@/utils'
import { HttpResponse, http } from 'msw'
import { optionsOneDay } from '../configs'

const endpoint = `${NEXT_PUBLIC_BASE_URL}/search/movie`

export async function getSearch(props: { query: string; page: string } = { query: '', page: '1' }) {
  const page = clamp(Number(props.page), 1, 500)

  const searchParams = new URLSearchParams({
    query: props.query,
    include_adult: 'false',
    language: 'pt-BR',
    page: String(page),
    region: 'BR',
  })

  const response = await fetch(`${endpoint}?${searchParams.toString()}`, optionsOneDay)
  const result = (await response.json()) as FullMovie
  return result
}

export const mockGetSearch = http.get(endpoint, ({ request }) => {
  const url = new URL(request.url)
  const query = url.searchParams.get('query')
  if (query === 'a') return HttpResponse.json(MOCK_GET_SEARCH_QUERY_A)
  return HttpResponse.json(MOCK_GET_SEARCH_QUERY_ANY)
})
