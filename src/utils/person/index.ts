import { SocialMedia } from '@/@types'

export function filterSocialMediaSelected(socialMedia: SocialMedia) {
  const listSocialMedia = {
    facebook: socialMedia.facebook_id,
    instagram: socialMedia.instagram_id,
    twitter: socialMedia.twitter_id,
  }
  return Object.entries(listSocialMedia).filter((item) => item[1])
}
