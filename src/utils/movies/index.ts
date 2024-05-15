import { Movie } from '@/@types'

export function sortByReleaseDate(movies: Movie[]) {
  return movies.sort((a, b) => (a.release_date > b.release_date ? -1 : a.release_date < b.release_date ? 1 : 0))
}

export function removeMovieWithoutThumbnail(movies: Movie[]) {
  return movies.filter((result) => result.backdrop_path && result.poster_path)
}
