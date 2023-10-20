import { FullMovie } from '@/@types'
import { MovieCard } from '../MovieCard'
import { MovieCardSkeleton } from '../MovieCardSkeleton'
import { Pagination } from '../Pagination'
import S from './styles.module.scss'

interface DepartmentProps {
  title: string
  movies: FullMovie
  upcoming?: boolean
}

export const Department = ({ title, movies, upcoming }: DepartmentProps) => {
  const results = movies.results
  const totalPages = movies.total_pages

  return (
    <div className={S.container}>
      <h1 className={S.title}>{title}</h1>

      <div className={S.gallery}>
        {/* <aside className={S.filtersContainer}></aside> */}

        <section className={[S.moviesContainer, !results.length ? S.skeleton : ''].join(' ')}>
          {!!results.length &&
            results.map((movie) => {
              const id = movie.id
              const date = movie.release_date
              const grade = movie.vote_average
              const poster = movie.poster_path
              const title = movie.title

              return <MovieCard key={id} id={id} date={date} grade={grade} poster={poster} title={title} upcoming={upcoming} department />
            })}

          {!results.length && <MovieCardSkeleton upcoming={upcoming} />}
        </section>

        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
