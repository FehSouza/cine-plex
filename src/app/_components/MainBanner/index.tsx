'use client'

import { Movie } from '@/@types'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useCallback } from 'react'
import { BsFillStarFill } from 'react-icons/bs'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import S from './styles.module.scss'

interface MainBannerProps {
  movies: Movie[]
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
          const src = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
          const title = movie.title
          const description = movie.overview
          const grade = movie.vote_average

          return (
            <div className={S.emblaSlide} key={id}>
              <Image className={S.image} loader={() => src} src={src} alt={`Imagem do Filme ${title}`} width={1920} height={1080} />
              <div className={S.info}>
                <div className={S.infoWrapper}>
                  <span className={S.title}>{title}</span>
                  <span className={S.description}>{description}</span>
                  <span className={S.grade}>
                    <BsFillStarFill /> {grade}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <button className={[S.emblaArrow, S.emblaPrev].join(' ')} onClick={handlePrev}>
        <IoIosArrowBack size={20} />
      </button>

      <button className={[S.emblaArrow, S.emblaNext].join(' ')} onClick={handleNext}>
        <IoIosArrowForward size={20} />
      </button>
    </div>
  )
}
