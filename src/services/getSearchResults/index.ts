import {
  MOCK_GET_SEARCH_PERSON_QUERY_A,
  MOCK_GET_SEARCH_PERSON_QUERY_ANY,
  MOCK_GET_SEARCH_QUERY_A,
  MOCK_GET_SEARCH_QUERY_ANY,
} from '@/mocks'
import { HttpResponse, http } from 'msw'

const URL = '/api/search'

export const getSearchResults = async (props: { query: string } = { query: '' }) => {
  const searchParams = new URLSearchParams({
    q: props.query,
  })

  const response = await fetch(`${URL}?${searchParams.toString()}`)
  const result = await response.json()
  return result
}

export const mockGetSearchResults = http.get(URL, ({ request }) => {
  const searchParams = new URLSearchParams(request.url)
  const query = searchParams.get(`${URL}?q`)
  console.log({ query, searchParams })
  if (query === 'a') return HttpResponse.json({ movies: MOCK_GET_SEARCH_QUERY_A, people: MOCK_GET_SEARCH_PERSON_QUERY_A })
  return HttpResponse.json({ movies: MOCK_GET_SEARCH_QUERY_ANY, people: MOCK_GET_SEARCH_PERSON_QUERY_ANY })
})
