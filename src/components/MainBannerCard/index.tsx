'use client'

import Image, { ImageLoader } from 'next/image'
import Link from 'next/link'
import { BsFillStarFill } from 'react-icons/bs'
import S from './styles.module.scss'

interface MainBannerCardProps {
  index: number
  id: number
  backdrop: string
  title: string
  description: string
  grade: number
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

export function MainBannerCard({ index, id, backdrop, title, description, grade }: MainBannerCardProps) {
  const formattedGrade = grade.toFixed(1).replace('.0', '')

  return (
    <Link data-testid="main-banner-card" className={S.container} href={`/filme/${id}`}>
      {!!backdrop && (
        <Image
          data-testid="main-banner-card-image"
          className={S.image}
          loader={TMDBBackdropLoader}
          src={backdrop}
          alt={`Imagem do Filme ${title}`}
          fill
          priority={index === 0 ? true : false}
        />
      )}
      <div className={S.info}>
        <div className={S.infoWrapper}>
          <span data-testid="main-banner-card-title" className={S.title}>
            {title}
          </span>

          <span data-testid="main-banner-card-description" className={S.description}>
            {description}
          </span>

          <span data-testid="main-banner-card-grade" className={S.grade}>
            <BsFillStarFill /> {formattedGrade}
          </span>
        </div>
      </div>
    </Link>
  )
}
