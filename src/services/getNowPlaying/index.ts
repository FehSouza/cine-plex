import { FullMovie } from '@/@types'
import { clamp } from '@/utils'
import { optionsOneHour } from '../configs'

export async function getNowPlaying(props: { page: string } = { page: '1' }) {
  const page = clamp(Number(props.page), 1, 500)

  const searchParams = new URLSearchParams()
  searchParams.append('language', 'pt-BR')
  searchParams.append('page', String(page))

  const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?${searchParams.toString()}`, optionsOneHour)
  return (await response.json()) as FullMovie
}

// export const mockGetNowPlaying = http.get('https://api.themoviedb.org/3/movie/now_playing', ({ request }) => {
//   const searchParams = new URLSearchParams(request.url)
//   const page = searchParams.get('page')
//   if (page === '2') return HttpResponse.json({})
//   return HttpResponse.json({})
// })
