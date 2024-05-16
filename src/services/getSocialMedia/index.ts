import { SocialMedia } from '@/@types'
import { MOCK_GET_SOCIAL_MEDIA } from '@/mocks'
import { HttpResponse, http } from 'msw'
import { optionsOneDay } from '../configs'

export async function getSocialMedia(id: number) {
  const response = await fetch(`https://api.themoviedb.org/3/person/${id}/external_ids`, optionsOneDay)
  const result = (await response.json()) as SocialMedia
  return result
}

export const mockGetSocialMedia = http.get('https://api.themoviedb.org/3/person/:id/external_ids', () =>
  HttpResponse.json(MOCK_GET_SOCIAL_MEDIA)
)
