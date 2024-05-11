import { Videos } from '@/@types'
import { optionsOneDay } from '../configs'

export async function getVideo(id: string) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=pt-BR`, optionsOneDay)
  let { results } = (await response.json()) as Videos

  if (!results.length) {
    const responseEn = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, optionsOneDay)
    const { results: resultsEn } = (await responseEn.json()) as Videos
    results = resultsEn
  }

  const filteredList = results?.filter((res) => res.site === 'YouTube' && res.key && res.official)
  return filteredList
}
