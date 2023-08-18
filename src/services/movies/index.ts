import { Certifications, Movie, MovieCredits, MovieDetail, Videos } from '@/@types'
import { COLOR_DICTIONARY } from '@/dictionary'

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

export async function getUpcoming() {
  const res = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=pt-BR&page=1&region=BR', options)
  const response = (await res.json()) as { results: Movie[] }
  const filteredList = response.results.filter((result) => result.backdrop_path && result.poster_path)

  const sortByReleaseDate = filteredList?.sort((a, b) => {
    return a.release_date < b.release_date ? -1 : a.release_date > b.release_date ? 1 : 0
  })

  return sortByReleaseDate
}

export async function getPopular() {
  const res = await fetch('https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1&region=BR', options)
  const response = (await res.json()) as { results: Movie[] }
  const filteredList = response.results.filter((result) => result.backdrop_path && result.poster_path)
  return filteredList
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
