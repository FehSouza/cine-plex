import Link from 'next/link'
import S from './styles.module.scss'

interface CarouselTitleProps {
  moviePage?: boolean
  hrefTitle?: string
  title: string
}

export function CarouselTitle({ moviePage, hrefTitle, title }: CarouselTitleProps) {
  const titleTestId = title.replace(/\s/g, '-').toLowerCase()

  return (
    <h2 data-testid={`carousel-${titleTestId}-title`} className={[S.title, moviePage ? S.titleMoviePage : ''].join(' ')}>
      {hrefTitle ? (
        <Link data-testid={`carousel-${titleTestId}-title-link`} href={hrefTitle}>
          {title}
        </Link>
      ) : (
        title
      )}
    </h2>
  )
}
