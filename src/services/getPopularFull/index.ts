import { getMoviesFullProps } from '@/@types'
import { getPopular } from '../getPopular'

export async function getPopularFull({ page }: getMoviesFullProps) {
  const response = await getPopular({ page })
  return response
}
