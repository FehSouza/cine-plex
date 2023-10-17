'use client'

import { Movie } from '@/@types'
import { formatDate } from '@/utils'
import useEmblaCarousel from 'embla-carousel-react'
import Image, { ImageLoader } from 'next/image'
import Link from 'next/link'
import { useCallback } from 'react'
import { BsFillStarFill } from 'react-icons/bs'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import S from './styles.module.scss'

interface CarouselProps {
  title: string
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

export function Carousel({ title, movies, upcoming, moviePage }: CarouselProps) {
  const movieList = movies.slice(0, 12)

  const [emblaRef, emblaApi] = useEmblaCarousel({ slidesToScroll: 1, containScroll: 'trimSnaps', align: 'start' })
  const handlePrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const handleNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const hideArrowsMobile = movies.length <= 2
  const hideArrowsDesktop = movies.length <= 4

  return (
    <section className={S.carousel}>
      <h2 className={[S.title, moviePage ? S.titleMoviePage : ''].join(' ')}>{title}</h2>

      <div className={[S.embla, moviePage ? S.emblaMoviePage : ''].join(' ')} ref={emblaRef}>
        <div className={S.emblaContainer}>
          {movieList.map((movie) => {
            const id = movie.id
            const grade = movie.vote_average
            const title = movie.title
            const date = movie.release_date

            return (
              <Link href={`/filme/${id}`} className={S.emblaSlide} key={id}>
                <div className={S.imageWrapper}>
                  <Image className={S.image} loader={TMDBPosterLoader} src={movie.poster_path} alt={`Imagem do Filme ${title}`} fill />
                </div>

                {!upcoming && (
                  <div className={S.gradeWrapper}>
                    {!!grade && (
                      <span className={S.grade}>
                        <BsFillStarFill /> {grade.toFixed(1)}
                      </span>
                    )}
                  </div>
                )}

                {upcoming && <span className={S.upcoming}>{`Estreia ${formatDate(date)}`}</span>}
                <span className={S.titleMovie}>{title}</span>
                <button className={S.seeMore}>Veja detalhes</button>
              </Link>
            )
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
