'use client'

import { Movie } from '@/@types'
import Image from 'next/image'
import S from './styles.module.scss'

interface MainBannerProps {
  movies: Movie[]
}

export default function MainBanner({ movies }: MainBannerProps) {
  console.log(movies)

  return (
    <div>
      {movies.map((movie) => {
        const src = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`

        return (
          <div key={movie.id} className={S.wrapper} style={{ position: 'relative' }}>
            <Image className={S.image} loader={() => src} src={src} alt={`Imagem do Filme ${movie.title}`} width={1920} height={1080} />
            <div style={{ position: 'absolute' }}>
              <span>{movie.title}</span>
              <span>{movie.overview}</span>
              <span>{movie.vote_average}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
