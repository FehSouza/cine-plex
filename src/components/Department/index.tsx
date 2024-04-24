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
  const results = movies?.results
  const totalPages = movies?.total_pages

  return (
    <div data-testid="department" className={S.container}>
      {!!title && (
        <h1 data-testid="department-title" className={S.title}>
          {title}
        </h1>
      )}

      <div className={S.gallery}>
        {!!movies?.total_results && (
          <section data-testid="department-movies-container" className={[S.moviesContainer, !results.length ? S.skeleton : ''].join(' ')}>
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
        )}

        {(!movies || !movies.total_results) && (
          <section data-testid="department-not-found-container" className={S.notFoundContainer}>
            <p>Não encontramos filmes que correspondam aos seus critérios de busca.</p>
            <p className={S.warning}>Tente seguir essas dicas e realize a sua busca novamente:</p>
            <ul className={S.listTips}>
              <li className={S.tip}>
                <div className={S.dot} /> Realize a busca utilizando palavra-chave;
              </li>
              <li className={S.tip}>
                <div className={S.dot} /> Tente deixar a sua busca menos específica;
              </li>
              <li className={S.tip}>
                <div className={S.dot} /> Verifique se a palavra foi escrita corretamente.
              </li>
            </ul>
          </section>
        )}

        {!upcoming && <Pagination totalPages={totalPages} />}
      </div>
    </div>
  )
}
