import { formatDate } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { BsFillStarFill, BsImage } from 'react-icons/bs'
import { TMDBPosterLoader } from '../Carousel'
import S from './styles.module.scss'

interface MovieCardProps {
  id: number
  date: string
  grade: number
  poster: string
  title: string
  upcoming?: boolean
}

export const MovieCard = ({ id, date, grade, poster, title, upcoming }: MovieCardProps) => {
  return (
    <Link href={`/filme/${id}`} className={S.container}>
      <div className={S.imageWrapper}>
        {poster && <Image className={S.image} loader={TMDBPosterLoader} src={poster} alt={`Poster do Filme ${title}`} fill />}

        {!poster && (
          <div className={[S.image, S.withoutImage].join(' ')}>
            <BsImage size={80} />
          </div>
        )}
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
}
