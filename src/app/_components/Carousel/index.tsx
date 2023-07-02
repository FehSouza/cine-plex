'use client'

import { Movie } from '@/@types'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useCallback } from 'react'
import { BsFillStarFill } from 'react-icons/bs'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import S from './styles.module.scss'

interface CarouselProps {
  title: string
  movies: Movie[]
  upcoming?: boolean
}

export default function Carousel({ title, movies, upcoming }: CarouselProps) {
  const movieList = movies.slice(0, 8)

  const [emblaRef, emblaApi] = useEmblaCarousel({ slidesToScroll: 1, containScroll: 'trimSnaps', align: 'start' })
  const handlePrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const handleNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  return (
    <section className={S.carousel}>
      <h2 className={S.title}>{title}</h2>

      <div className={S.embla} ref={emblaRef}>
        <div className={S.emblaContainer}>
          {movieList.map((movie) => {
            const id = movie.id
            const src = `https://image.tmdb.org/t/p/original${movie.poster_path}`
            const grade = movie.vote_average
            const title = movie.title

            return (
              <div className={S.emblaSlide} key={id}>
                <div className={S.imageWrapper}>
                  <Image className={S.image} loader={() => src} src={src} alt={`Imagem do Filme ${title}`} width={1920} height={1080} />
                </div>
                {!upcoming && (
                  <span className={S.gradeWrapper}>
                    <BsFillStarFill /> {grade}
                  </span>
                )}
                {upcoming && <span className={S.upcoming}>Estreia</span>}
                <span className={S.titleMovie}>{title}</span>
                <button className={S.seeMore}>Veja detalhes</button>
              </div>
            )
          })}
        </div>

        <button className={[S.emblaArrow, S.emblaPrev].join(' ')} onClick={handlePrev}>
          <IoIosArrowBack size={18} />
        </button>

        <button className={[S.emblaArrow, S.emblaNext].join(' ')} onClick={handleNext}>
          <IoIosArrowForward size={18} />
        </button>
      </div>
    </section>
  )
}
