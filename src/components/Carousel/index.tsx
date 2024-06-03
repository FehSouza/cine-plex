'use client'

import { Movie } from '@/@types'
import useEmblaCarousel from 'embla-carousel-react'
import { ImageLoader } from 'next/image'
import { useCallback, useMemo } from 'react'
import { CarouselArrow } from '../CarouselArrow'
import { CarouselTitle } from '../CarouselTitle'
import { MovieCard } from '../MovieCard'
import S from './styles.module.scss'

interface CarouselProps {
  title: string
  hrefTitle?: string
  movies: Movie[]
  upcoming?: boolean
  moviePage?: boolean
}

export const LoaderPoster: ImageLoader = ({ src, width }) => {
  const DICTIONARY_WIDTH = {
    640: 'w200',
    750: 'w200',
    828: 'w400',
    1080: 'w400',
    1200: 'w400',
    1920: 'w400',
    2048: 'w400',
    3840: 'w400',
  }

  return `https://image.tmdb.org/t/p/${DICTIONARY_WIDTH[width as keyof typeof DICTIONARY_WIDTH]}${src}`
}

export function Carousel({ title, hrefTitle, movies, upcoming, moviePage }: CarouselProps) {
  const movieList = useMemo(() => movies?.slice(0, 10), [movies])

  const [emblaRef, emblaApi] = useEmblaCarousel({ slidesToScroll: 1, containScroll: 'trimSnaps', align: 'start' })
  const handlePrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const handleNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const hideArrowsMobile = movies?.length <= 2
  const hideArrowsDesktop = movies?.length <= 4

  const titleTestId = title?.replace(/\s/g, '-')?.toLowerCase()

  return (
    <section data-testid={`carousel-${titleTestId}`} className={S.carousel}>
      {!!title && <CarouselTitle moviePage={moviePage} hrefTitle={hrefTitle} title={title} />}

      <div className={[S.embla, moviePage ? S.emblaMoviePage : ''].join(' ')} ref={emblaRef}>
        <div className={S.emblaContainer}>
          {movieList?.map((movie, index) => {
            const id = movie.id
            const date = movie.release_date
            const grade = movie.vote_average
            const poster = movie.poster_path
            const title = movie.title

            return <MovieCard index={index} key={id} id={id} date={date} grade={grade} poster={poster} title={title} upcoming={upcoming} />
          })}
        </div>

        <CarouselArrow handleClick={handlePrev} hideMobile={hideArrowsMobile} hideDesktop={hideArrowsDesktop} prev />
        <CarouselArrow handleClick={handleNext} hideMobile={hideArrowsMobile} hideDesktop={hideArrowsDesktop} />
      </div>
    </section>
  )
}
