'use client'

import { Movie } from '@/@types'
import useEmblaCarousel from 'embla-carousel-react'
import Image, { ImageLoader } from 'next/image'
import Link from 'next/link'
import { useCallback } from 'react'
import { BsFillStarFill } from 'react-icons/bs'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import S from './styles.module.scss'

interface MainBannerProps {
  movies: Movie[]
}

export const TMDBBackdropLoader: ImageLoader = ({ src, width }) => {
  const DICTIONARY_WIDTH = {
    640: 'w500',
    750: 'w500',
    828: 'w500',
    1080: 'w1280',
    1200: 'w1280',
    1920: 'w1280',
    2048: 'original',
    3840: 'original',
  }

  return `https://image.tmdb.org/t/p/${DICTIONARY_WIDTH[width as keyof typeof DICTIONARY_WIDTH]}${src}`
}

export default function MainBanner({ movies }: MainBannerProps) {
  const movieList = movies.slice(0, 5)

  const [emblaRef, emblaApi] = useEmblaCarousel()
  const handlePrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const handleNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  return (
    <div className={S.embla} ref={emblaRef}>
      <div className={S.emblaContainer}>
        {movieList.map((movie) => {
          const id = movie.id
          const title = movie.title
          const description = movie.overview
          const grade = movie.vote_average

          return (
            <Link href={`/filme/${id}`} className={S.emblaSlide} key={id}>
              <Image className={S.image} loader={TMDBBackdropLoader} src={movie.backdrop_path} alt={`Imagem do Filme ${title}`} fill />
              <div className={S.info}>
                <div className={S.infoWrapper}>
                  <span className={S.title}>{title}</span>
                  <span className={S.description}>{description}</span>
                  <span className={S.grade}>
                    <BsFillStarFill /> {grade}
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <button aria-label="Botão de voltar" className={[S.emblaArrow, S.emblaPrev].join(' ')} onClick={handlePrev}>
        <div className={S.emblaArrowInternal}>
          <IoIosArrowBack size={20} />
        </div>
      </button>

      <button aria-label="Botão de avançar" className={[S.emblaArrow, S.emblaNext].join(' ')} onClick={handleNext}>
        <div className={S.emblaArrowInternal}>
          <IoIosArrowForward size={20} />
        </div>
      </button>
    </div>
  )
}
