import { removeVideosAreNotYouTube } from '@/utils'
import { getVideos } from '../getVideos'

export async function getVideosYouTube(id: string) {
  const { results } = await getVideos(id)
  const videosList = removeVideosAreNotYouTube(results)
  return videosList
}
