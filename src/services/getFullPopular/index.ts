import { FullMovie, getFullMoviesProps } from '@/@types'
import { optionsOneHour } from '../configs'

export async function getFullPopular({ page }: getFullMoviesProps) {
  const pageFormatted = Number(page) > 500 ? 500 : page
  const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=${pageFormatted}&region=BR`, optionsOneHour)
  const result = (await response.json()) as FullMovie
  return result
}
