import { getFullUpcoming } from '@/services'
import { MovieCard } from '../_components'
import S from './styles.module.scss'

export default async function Premieres() {
  const [upcoming] = await Promise.all([getFullUpcoming()])

  return (
    <main className={S.main}>
      <div className={S.container}>
        <h1 className={S.title}>Filmes que estreiam em breve</h1>

        <div className={S.gallery}>
          <aside className={S.filtersContainer}></aside>

          <section className={S.moviesContainer}>
            {upcoming.map((movie) => {
              const id = movie.id
              const date = movie.release_date
              const grade = movie.vote_average
              const poster = movie.poster_path
              const title = movie.title

              return <MovieCard key={id} id={id} date={date} grade={grade} poster={poster} title={title} upcoming />
            })}
          </section>
        </div>
      </div>
    </main>
  )
}
