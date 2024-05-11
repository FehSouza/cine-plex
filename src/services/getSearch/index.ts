import { FullMovie, getSearchProps } from '@/@types'
import { optionsOneDay } from '../configs'

export async function getSearch({ query, page }: getSearchProps) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=pt-BR&page=${page}&region=BR`,
    optionsOneDay
  )
  const result = (await response.json()) as FullMovie

  return result
}
