import { TMDBBackdropLoader } from '@/app/_components'
import { getMovie } from '@/app/services'
import Image from 'next/image'
import S from './styles.module.scss'

interface MovieProps {
  params: { id: string }
}

export default async function Movie({ params }: MovieProps) {
  const movie = await getMovie(params.id)

  const title = movie.title
  const image = movie.backdrop_path

  return (
    <main className={S.main}>
      <div className={S.imageWrapper}>
        <Image className={S.image} loader={TMDBBackdropLoader} src={image} alt={`Imagem do Filme ${title}`} fill />
      </div>
      <div className={S.container}></div>
    </main>
  )
}
