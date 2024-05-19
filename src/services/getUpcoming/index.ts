import { FullMovie } from '@/@types'
import { optionsOneHour } from '../configs'

const URL = 'https://api.themoviedb.org/3/movie/upcoming'

export async function getUpcoming() {
  const searchParams = new URLSearchParams({
    language: 'pt-BR',
    region: 'BR',
  })

  const response = await fetch(`${URL}?${searchParams.toString()}`, optionsOneHour)
  const result = (await response.json()) as FullMovie
  return result
}
