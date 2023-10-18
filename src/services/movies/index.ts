import { Certifications, FullMovie, Movie, MovieCredits, MovieDetail, Person, PersonCredits, SocialMedia, Videos, Watch } from '@/@types'
import { COLOR_DICTIONARY } from '@/dictionary'

interface getFullMoviesProps {
  page: string
}

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
}

export async function getBestMovies() {
  const res = await fetch(
    'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&region=BR&sort_by=popularity.desc&vote_average.gte=8.5',
    options
  )
  const response = (await res.json()) as { results: Movie[] }
  const filteredList = response.results.filter((result) => result.backdrop_path && result.poster_path)
  return filteredList
}

export async function getNowPlaying() {
  const res = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=1&region=BR', options)
  const response = (await res.json()) as { results: Movie[] }
  const filteredList = response.results.filter((result) => result.backdrop_path && result.poster_path)
  return filteredList
}

export async function getFullNowPlaying({ page }: getFullMoviesProps) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=${page}&region=BR`, options)
  const response = (await res.json()) as FullMovie
  return response
}

export async function getUpcoming() {
  const res = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=pt-BR&page=1&region=BR', options)
  const response = (await res.json()) as { results: Movie[] }
  const filteredList = response.results.filter((result) => result.backdrop_path && result.poster_path)

  const sortByReleaseDate = filteredList?.sort((a, b) => {
    return a.release_date < b.release_date ? -1 : a.release_date > b.release_date ? 1 : 0
  })

  return sortByReleaseDate
}

export async function getFullUpcoming({ page }: getFullMoviesProps) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=pt-BR&page=${page}&region=BR`, options)
  const response = (await res.json()) as FullMovie

  response?.results?.sort((a, b) => {
    return a.release_date < b.release_date ? -1 : a.release_date > b.release_date ? 1 : 0
  })

  return response
}

export async function getPopular() {
  const res = await fetch('https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1&region=BR', options)
  const response = (await res.json()) as { results: Movie[] }
  const filteredList = response.results.filter((result) => result.backdrop_path && result.poster_path)
  return filteredList
}

export async function getFullPopular({ page }: getFullMoviesProps) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=${page}&region=BR`, options)
  const response = (await res.json()) as FullMovie
  return response
}

export async function getMovie(id: string) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=pt-BR`, options)
  const response = (await res.json()) as MovieDetail
  return response
}

export async function getCreditsMovie(id: string) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=bt-BR`, options)
  const response = (await res.json()) as MovieCredits
  return response
}

export async function getVideo(id: string) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=pt-BR`, options)
  const response = (await res.json()) as Videos
  const filteredList = response.results.filter((res) => res.site === 'YouTube' && res.official)
  return filteredList
}

export async function getClassifications(id: string) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/release_dates`, options)
  const response = (await res.json()) as Certifications

  const filteredList = response.results.reduce((acc, result) => {
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

export async function getWatch(id: string) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers`, options)
  const response = (await res.json()) as Watch
  const filteredList = response?.results?.BR
  return filteredList
}

export async function getRecommendations(id: string) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=pt-BR&page=1`, options)
  const response = (await res.json()) as { results: Movie[] }
  const filteredList = response.results.filter((result) => result.backdrop_path && result.poster_path)
  return filteredList
}

export async function getPerson(id: string) {
  const res = await fetch(`https://api.themoviedb.org/3/person/${id}?language=pt-BR`, options)
  const response = (await res.json()) as Person
  return response
}

export async function getSocialMedia(id: number) {
  const res = await fetch(`https://api.themoviedb.org/3/person/${id}/external_ids`, options)
  const response = (await res.json()) as SocialMedia

  const listSocialMedia = {
    facebook: response.facebook_id,
    instagram: response.instagram_id,
    twitter: response.twitter_id,
  }

  return Object.entries(listSocialMedia).filter((item) => item[1])
}

export async function getPersonCredits(id: string) {
  const res = await fetch(`https://api.themoviedb.org/3/person/${id}/combined_credits?language=pt-BR`, options)
  const response = (await res.json()) as PersonCredits
  const filteredListCast = response.cast.filter((cast) => cast.media_type !== 'tv')
  const filteredListCrew = response.crew.filter((crew) => crew.media_type !== 'tv')
  return { id: response.id, cast: filteredListCast, crew: filteredListCrew }
}
