import { getSearch, getSearchPerson } from '@/services'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  if (!query) return NextResponse.json({ page: 0, results: [], total_pages: 0, total_results: 0 })

  const params = { query, page: '1' }

  const [resultMovies, resultePeople] = await Promise.all([getSearch(params), getSearchPerson(params)])
  return NextResponse.json({ movies: resultMovies, people: resultePeople })
}
