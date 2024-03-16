'use client'

import { Movie } from '@/@types'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useMemo } from 'react'
import { CarouselArrow } from '../CarouselArrow'
import { MainBannerCard } from '../MainBannerCard'
import S from './styles.module.scss'

interface MainBannerProps {
  movies: Movie[]
}

export function MainBanner({ movies }: MainBannerProps) {
  const movieList = useMemo(() => movies?.slice(0, 5), [movies])

  const [emblaRef, emblaApi] = useEmblaCarousel()
  const handlePrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const handleNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  return (
    <div className={S.embla} ref={emblaRef}>
      <div className={S.emblaContainer}>
        {movieList?.map((movie, index) => {
          const id = movie.id
          const backdrop = movie.backdrop_path
          const title = movie.title
          const description = movie.overview
          const grade = movie.vote_average

          return (
            <MainBannerCard
              key={`main-banner-card-${id}`}
              index={index}
              id={id}
              backdrop={backdrop}
              title={title}
              description={description}
              grade={grade}
            />
          )
        })}
      </div>

      <CarouselArrow handleClick={handlePrev} banner prev />
      <CarouselArrow handleClick={handleNext} banner />
    </div>
  )
}
