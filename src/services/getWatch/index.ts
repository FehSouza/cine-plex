import { Watch, WatchData, WatchResults } from '@/@types'
import { optionsOneDay } from '../configs'

const filterProviders = (item: WatchData) => item.provider_id && item.provider_name && item.logo_path

const filterWatch = (data: WatchResults) => {
  const ads = data?.ads?.filter(filterProviders)
  const buy = data?.buy?.filter(filterProviders)
  const flatrate = data?.flatrate?.filter(filterProviders)
  const rent = data?.rent?.filter(filterProviders)
  return { ads, buy, flatrate, rent }
}

export async function getWatch(id: string) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers`, optionsOneDay)
  const result = (await response.json()) as Watch
  const filteredList = result?.results?.BR
  return filterWatch(filteredList)
}
