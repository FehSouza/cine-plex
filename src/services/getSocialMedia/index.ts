import { SocialMedia } from '@/@types'
import { optionsOneDay } from '../configs'

export async function getSocialMedia(id: number) {
  const response = await fetch(`https://api.themoviedb.org/3/person/${id}/external_ids`, optionsOneDay)
  const result = (await response.json()) as SocialMedia

  const listSocialMedia = {
    facebook: result.facebook_id,
    instagram: result.instagram_id,
    twitter: result.twitter_id,
  }

  return Object.entries(listSocialMedia).filter((item) => item[1])
}
