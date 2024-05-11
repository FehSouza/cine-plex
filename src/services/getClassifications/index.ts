import { Certifications } from '@/@types'
import { COLOR_DICTIONARY } from '@/dictionary'
import { MOCK_GET_CLASSIFICATIONS } from '@/mocks/getClassifications'
import { HttpResponse, http } from 'msw'
import { optionsOneDay } from '../configs'

export async function getClassifications(id: string) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/release_dates`, optionsOneDay)
  const result = (await response.json()) as Certifications

  const filteredList = result.results.reduce((acc, result) => {
    if (result.iso_3166_1 === 'BR' || result.iso_3166_1 === 'US') {
      result.release_dates.forEach((release) => {
        const certification = release.certification
        if (certification) return (acc = [...acc, { country: result.iso_3166_1, certification, color: COLOR_DICTIONARY[certification] }])
      })
    }

    return acc
  }, [] as { country: string; certification: string; color: string }[])

  return filteredList
}

export const mockGetClassifications = http.get('https://api.themoviedb.org/3/movie/:id/release_dates', () =>
  HttpResponse.json(MOCK_GET_CLASSIFICATIONS)
)
