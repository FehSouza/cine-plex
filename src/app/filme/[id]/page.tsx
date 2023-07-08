import { getMovie } from '@/app/services'
import S from './styles.module.scss'

interface MovieProps {
  params: { id: string }
}

export default async function Movie({ params }: MovieProps) {
  const movie = await getMovie(params.id)

  return (
    <main className={S.main}>
      <div className={S.container}>{movie.title}</div>
    </main>
  )
}
