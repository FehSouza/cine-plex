import { filterSocialMediaSelected } from '@/utils'
import { getSocialMedia } from '../getSocialMedia'

export async function getSocialMediaSelected(id: number) {
  const results = await getSocialMedia(id)
  const socialMediaList = filterSocialMediaSelected(results)
  return socialMediaList
}
