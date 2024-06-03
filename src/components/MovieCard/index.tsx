import { DISABLE_IMAGE_OPTIMIZATION } from '@/config'
import { formatDate } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { BsFillStarFill, BsImage } from 'react-icons/bs'
import { LoaderPoster } from '../Carousel'
import S from './styles.module.scss'

interface MovieCardProps {
  index: number
  id: number
  date: string
  grade: number
  poster: string
  title: string
  upcoming?: boolean
  department?: boolean
}

export const MovieCard = ({ index, id, date, grade, poster, title, upcoming, department }: MovieCardProps) => {
  return (
    <Link data-testid={`movie-card-${index}`} href={`/filme/${id}`} className={[S.container, department ? S.department : ''].join(' ')}>
      <div className={S.imageWrapper}>
        {poster && (
          <Image
            data-testid="movie-card-image"
            className={S.image}
            loader={LoaderPoster}
            src={poster}
            alt={`Poster do Filme ${title}`}
            fill
            unoptimized={DISABLE_IMAGE_OPTIMIZATION}
          />
        )}

        {!poster && (
          <div data-testid="movie-card-icon" className={[S.image, S.withoutImage].join(' ')}>
            <BsImage size={80} />
          </div>
        )}
      </div>

      {!upcoming && (
        <div className={S.gradeWrapper}>
          {!!grade && (
            <span data-testid="movie-card-grade" className={S.grade}>
              <BsFillStarFill /> {grade.toFixed(1)}
            </span>
          )}
        </div>
      )}

      {upcoming && date && <span data-testid="movie-card-date" className={S.upcoming}>{`Estreia ${formatDate(date)}`}</span>}

      {title && (
        <span data-testid="movie-card-title" className={S.titleMovie}>
          {title}
        </span>
      )}

      <button data-testid="movie-card-button" className={S.seeMore}>
        Veja detalhes
      </button>
    </Link>
  )
}
