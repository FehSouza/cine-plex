import {
  Certifications,
  FullMovie,
  Movie,
  MovieCredits,
  MovieDetail,
  Person,
  PersonCredits,
  SocialMedia,
  Videos,
  Watch,
  WatchData,
  WatchResults,
} from '@/@types'
import { COLOR_DICTIONARY } from '@/dictionary'

interface getFullMoviesProps {
  page: string
}

interface getSearchProps {
  query: string
  page: string
}

const optionsOneHour = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
  next: { revalidate: 3600 },
}

const optionsOneDay = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
  next: { revalidate: 86400 },
}

export async function getBestMovies() {
  const response = await fetch(
    'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&region=BR&sort_by=popularity.desc&vote_average.gte=8.5',
    optionsOneDay
  )
  const result = (await response.json()) as { results: Movie[] }
  const filteredList = result.results?.filter(
    (res) => res.id && res.title && res.backdrop_path && res.poster_path && res.overview && res.vote_average
  )

  return filteredList
}

export async function getNowPlaying() {
  const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=1', optionsOneHour)
  const result = (await response.json()) as { results: Movie[] }
  const filteredList = result.results?.filter((result) => result.backdrop_path && result.poster_path)
  const sortByReleaseDate = filteredList?.sort((a, b) => {
    return a.release_date > b.release_date ? -1 : a.release_date < b.release_date ? 1 : 0
  })

  return sortByReleaseDate
}

export async function getFullNowPlaying({ page }: getFullMoviesProps) {
  const pageFormatted = Number(page) > 500 ? 500 : page
  const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=${pageFormatted}`, optionsOneHour)
  const result = (await response.json()) as FullMovie
  const sortByReleaseDate = result?.results?.sort((a, b) => {
    return a.release_date > b.release_date ? -1 : a.release_date < b.release_date ? 1 : 0
  })

  return { ...result, results: sortByReleaseDate }
}

export async function getUpcoming() {
  const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=pt-BR&region=BR', optionsOneHour)
  const result = (await response.json()) as { results: Movie[] }
  const filteredList = result.results?.filter((result) => result.backdrop_path && result.poster_path)

  const sortByReleaseDate = filteredList?.sort((a, b) => {
    return a.release_date < b.release_date ? -1 : a.release_date > b.release_date ? 1 : 0
  })

  return sortByReleaseDate
}

export async function getFullUpcoming() {
  const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=pt-BR&region=BR', optionsOneHour)
  const result = (await response.json()) as FullMovie

  result?.results?.sort((a, b) => {
    return a.release_date < b.release_date ? -1 : a.release_date > b.release_date ? 1 : 0
  })

  return result
}

export async function getPopular() {
  const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1&region=BR', optionsOneHour)
  const result = (await response.json()) as { results: Movie[] }
  const filteredList = result.results?.filter((result) => result.backdrop_path && result.poster_path)
  return filteredList
}

export async function getFullPopular({ page }: getFullMoviesProps) {
  const pageFormatted = Number(page) > 500 ? 500 : page
  const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=${pageFormatted}&region=BR`, optionsOneHour)
  const result = (await response.json()) as FullMovie
  return result
}

export async function getMovie(id: string) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=pt-BR`, optionsOneDay)
  const result = (await response.json()) as MovieDetail
  return result
}

export async function getCreditsMovie(id: string) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=bt-BR`, optionsOneDay)
  const result = (await response.json()) as MovieCredits
  return result
}

export async function getVideo(id: string) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=pt-BR`, optionsOneDay)
  let { results } = (await response.json()) as Videos

  if (!results.length) {
    const responseEn = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, optionsOneDay)
    const { results: resultsEn } = (await responseEn.json()) as Videos
    results = resultsEn
  }

  const filteredList = results?.filter((res) => res.site === 'YouTube' && res.key && res.official)
  return filteredList
}

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

export async function getRecommendations(id: string) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=pt-BR&page=1`, optionsOneDay)
  const result = (await response.json()) as { results: Movie[] }
  const filteredList = result.results?.filter((result) => result.backdrop_path && result.poster_path)
  return filteredList
}

export async function getPerson(id: string) {
  const response = await fetch(`https://api.themoviedb.org/3/person/${id}?language=pt-BR`, optionsOneDay)
  const result = (await response.json()) as Person
  return result
}

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

export async function getPersonCredits(id: string) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?language=pt-BR`, optionsOneDay)
    const result = (await response.json()) as PersonCredits
    return result
  } catch (error) {
    console.log('function getPersonCredits with Error: ', error)
    return { id: id, cast: [], crew: [] }
  }
}

export async function getSearch({ query, page }: getSearchProps) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=pt-BR&page=${page}&region=BR`,
    optionsOneDay
  )
  const result = (await response.json()) as FullMovie

  return result
}

export async function getSearchPerson({ query, page }: getSearchProps) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=pt-BR&page=${page}`,
    optionsOneDay
  )
  const result = (await response.json()) as Person

  return result
}
