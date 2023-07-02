import { Movie } from '@/@types'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
}

export async function getBestMovies() {
  const res = await fetch(
    'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&region=BR&sort_by=popularity.desc&vote_average.gte=7.5',
    options
  )

  const response = (await res.json()) as { results: Movie[] }
  return response.results
}

export async function getNowPlaying() {
  const res = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=1&region=BR', options)

  const response = (await res.json()) as { results: Movie[] }
  return response.results
}

export async function getUpcoming() {
  const res = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=pt-BR&page=1&region=BR', options)

  const response = (await res.json()) as { results: Movie[] }
  return response.results
}
