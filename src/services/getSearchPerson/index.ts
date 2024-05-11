import { Person, getSearchProps } from '@/@types'
import { optionsOneDay } from '../configs'

export async function getSearchPerson({ query, page }: getSearchProps) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=pt-BR&page=${page}`,
    optionsOneDay
  )
  const result = (await response.json()) as Person

  return result
}
