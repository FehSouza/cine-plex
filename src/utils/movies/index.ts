import { Certification, Movie, WatchData, WatchResults } from '@/@types'
import { COLOR_DICTIONARY } from '@/dictionary'

export function sortByReleaseDate(movies: Movie[]) {
  return movies.sort((a, b) => (a.release_date > b.release_date ? -1 : a.release_date < b.release_date ? 1 : 0))
}

export function removeMovieWithoutThumbnail(movies: Movie[]) {
  return movies.filter((res) => res.backdrop_path && res.poster_path)
}

export function removeMovieWithoutInfos(movies: Movie[]) {
  return movies.filter((res) => res.backdrop_path && res.poster_path && res.id && res.title && res.overview && res.vote_average)
}

export function filterClassificationsByRegion(certifications: Certification[]) {
  return certifications.reduce((acc, result) => {
    if (result.iso_3166_1 === 'BR' || result.iso_3166_1 === 'US') {
      result.release_dates.forEach((release) => {
        const certification = release.certification
        if (certification) return (acc = [...acc, { country: result.iso_3166_1, certification, color: COLOR_DICTIONARY[certification] }])
      })
    }

    return acc
  }, [] as { country: string; certification: string; color: string }[])
}

export function filterProviders(item: WatchData) {
  return item.provider_id && item.provider_name && item.logo_path
}

export function filterWatchWithInfos(data: WatchResults) {
  const ads = data?.ads?.filter(filterProviders)
  const buy = data?.buy?.filter(filterProviders)
  const flatrate = data?.flatrate?.filter(filterProviders)
  const rent = data?.rent?.filter(filterProviders)
  return { ads, buy, flatrate, rent }
}
