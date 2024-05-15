import { FullMovie } from '@/@types'
import { clamp } from '@/utils'
import { optionsOneHour } from '../configs'

const URL = 'https://api.themoviedb.org/3/movie/now_playing'

export async function getNowPlaying(props: { page: string } = { page: '1' }) {
  const page = clamp(Number(props.page), 1, 500)

  const searchParams = new URLSearchParams()
  searchParams.append('language', 'pt-BR')
  searchParams.append('page', String(page))

  const response = await fetch(`${URL}?${searchParams.toString()}`, optionsOneHour)
  const result = (await response.json()) as FullMovie
  return result
}

// export const mockGetNowPlaying = http.get(URL, ({ request }) => {
//   const searchParams = new URLSearchParams(request.url)
//   const page = searchParams.get('page')
//   if (page === '2') return HttpResponse.json({})
//   return HttpResponse.json({})
// })
