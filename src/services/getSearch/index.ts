import { FullMovie } from '@/@types'
import { MOCK_GET_SEARCH_QUERY_A, MOCK_GET_SEARCH_QUERY_ANY } from '@/mocks'
import { clamp } from '@/utils'
import { HttpResponse, http } from 'msw'
import { optionsOneDay } from '../configs'

const URL = 'https://api.themoviedb.org/3/search/movie'

export async function getSearch(props: { query: string; page: string } = { query: '', page: '1' }) {
  const page = clamp(Number(props.page), 1, 500)

  const searchParams = new URLSearchParams({
    query: props.query,
    include_adult: 'false',
    language: 'pt-BR',
    page: String(page),
    region: 'BR',
  })

  const response = await fetch(`${URL}?${searchParams.toString()}`, optionsOneDay)
  const result = (await response.json()) as FullMovie
  return result
}

export const mockGetSearch = http.get(URL, ({ request }) => {
  const searchParams = new URLSearchParams(request.url)
  const query = searchParams.get(`${URL}?query`)
  if (query === 'a') return HttpResponse.json(MOCK_GET_SEARCH_QUERY_A)
  return HttpResponse.json(MOCK_GET_SEARCH_QUERY_ANY)
})
