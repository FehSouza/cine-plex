import { SocialMedia } from '@/@types'
import { MOCK_GET_SOCIAL_MEDIA } from '@/mocks'
import { NEXT_PUBLIC_BASE_URL } from '@/utils'
import { HttpResponse, http } from 'msw'
import { optionsOneDay } from '../configs'

export async function getSocialMedia(id: number) {
  const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/person/${id}/external_ids`, optionsOneDay)
  const result = (await response.json()) as SocialMedia
  return result
}

export const mockGetSocialMedia = http.get(`${NEXT_PUBLIC_BASE_URL}/person/:id/external_ids`, () =>
  HttpResponse.json(MOCK_GET_SOCIAL_MEDIA)
)
