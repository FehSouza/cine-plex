import { Videos } from '@/@types'
import { optionsOneDay } from '../configs'

export async function getVideos(id: string) {
  const searchParams = new URLSearchParams({
    language: 'pt-BR',
  })

  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?${searchParams.toString()}`, optionsOneDay)
  const results = (await response.json()) as Videos
  return results
}
