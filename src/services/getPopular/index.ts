import { FullMovie } from '@/@types'
import { clamp } from '@/utils'
import { optionsOneHour } from '../configs'

const URL = 'https://api.themoviedb.org/3/movie/popular'

export async function getPopular(props: { page: string } = { page: '1' }) {
  const page = clamp(Number(props.page), 1, 500)

  const searchParams = new URLSearchParams({
    language: 'pt-BR',
    page: String(page),
    region: 'BR',
  })

  const response = await fetch(`${URL}?${searchParams.toString()}`, optionsOneHour)
  const result = (await response.json()) as FullMovie
  return result
}
