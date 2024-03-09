'use client'

import { Movie } from '@/@types'
import useEmblaCarousel from 'embla-carousel-react'
import { ImageLoader } from 'next/image'
import { useCallback, useMemo } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { MovieCard } from '../MovieCard'
import S from './styles.module.scss'
import Link from 'next/link'

interface CarouselProps {
  title: string
  hrefTitle?: string
  movies: Movie[]
  upcoming?: boolean
  moviePage?: boolean
}

export const TMDBPosterLoader: ImageLoader = ({ src, width }) => {
  const DICTIONARY_WIDTH = {
    640: 'w200',
    750: 'w200',
    828: 'w400',
    1080: 'w400',
    1200: 'w400',
    1920: 'w400',
    2048: 'w500',
    3840: 'original',
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

  return (
    <section className={S.carousel}>
      <h2 className={[S.title, moviePage ? S.titleMoviePage : ''].join(' ')}>
        {hrefTitle ? <Link href={hrefTitle}>{title}</Link> : title}
      </h2>

      <div className={[S.embla, moviePage ? S.emblaMoviePage : ''].join(' ')} ref={emblaRef}>
        <div className={S.emblaContainer}>
          {movieList?.map((movie) => {
            const id = movie.id
            const date = movie.release_date
            const grade = movie.vote_average
            const poster = movie.poster_path
            const title = movie.title

            return <MovieCard key={id} id={id} date={date} grade={grade} poster={poster} title={title} upcoming={upcoming} />
          })}
        </div>

        <button
          aria-label="Botão de voltar"
          className={[
            S.emblaArrow,
            S.emblaPrev,
            hideArrowsMobile ? S.hideArrowsMobile : '',
            hideArrowsDesktop ? S.hideArrowsDesktop : '',
          ].join(' ')}
          onClick={handlePrev}
        >
          <div className={S.emblaArrowInternal}>
            <IoIosArrowBack size={18} />
          </div>
        </button>

        <button
          aria-label="Botão de avançar"
          className={[
            S.emblaArrow,
            S.emblaNext,
            hideArrowsMobile ? S.hideArrowsMobile : '',
            hideArrowsDesktop ? S.hideArrowsDesktop : '',
          ].join(' ')}
          onClick={handleNext}
        >
          <div className={S.emblaArrowInternal}>
            <IoIosArrowForward size={18} />
          </div>
        </button>
      </div>
    </section>
  )
}
