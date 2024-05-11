import { FullMovie } from '@/@types'
import { optionsOneHour } from '../configs'

export async function getFullUpcoming() {
  const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=pt-BR&region=BR', optionsOneHour)
  const result = (await response.json()) as FullMovie

  result?.results?.sort((a, b) => {
    return a.release_date < b.release_date ? -1 : a.release_date > b.release_date ? 1 : 0
  })

  return result
}
