import { getFullPopular } from '@/services'
import { MovieCard } from '../_components'
import S from './styles.module.scss'

export default async function Suggestions() {
  const [popular] = await Promise.all([getFullPopular()])

  return (
    <main className={S.main}>
      <div className={S.container}>
        <h1 className={S.title}>Nossas sugestões de Filmes</h1>

        <div className={S.gallery}>
          <aside className={S.filtersContainer}></aside>

          <section className={S.moviesContainer}>
            {popular.map((movie) => {
              const id = movie.id
              const date = movie.release_date
              const grade = movie.vote_average
              const poster = movie.poster_path
              const title = movie.title

              return <MovieCard key={id} id={id} date={date} grade={grade} poster={poster} title={title} />
            })}
          </section>
        </div>
      </div>
    </main>
  )
}
