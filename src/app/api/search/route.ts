import { getSearch } from '@/services'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  if (!query) return NextResponse.json({ page: 0, results: [], total_pages: 0, total_results: 0 })

  const result = await getSearch({ query, page: '1' })
  return NextResponse.json(result)
}
