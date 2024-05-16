import { filterWatchWithInfos } from '@/utils'
import { getWatch } from '../getWatch'

export async function getWatchWithInfos(id: string) {
  const { results } = await getWatch(id)
  const watchList = filterWatchWithInfos(results?.BR)
  return watchList
}
