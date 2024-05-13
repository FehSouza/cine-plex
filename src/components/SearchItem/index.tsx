import { Movie, PersonSearch } from '@/@types'
import { DISABLE_IMAGE_OPTIMIZATION } from '@/config'
import Image from 'next/image'
import { BsImage } from 'react-icons/bs'
import { TMDBPosterLoader } from '../Carousel'
import S from './styles.module.scss'

interface SearchItemProps {
  suggestion: Movie | PersonSearch
  path: string
}

export const SearchItem = ({ suggestion, path }: SearchItemProps) => {
  const id = suggestion?.id
  const name = !!suggestion && 'title' in suggestion ? suggestion?.title : suggestion?.name
  const image = !!suggestion && 'poster_path' in suggestion ? suggestion?.poster_path : suggestion?.profile_path

  return (
    <>
      {!!id && !!name && !!path && (
        <li data-testid={`search-item-${id}`} className={S.container}>
          <a className={S.link} href={`${path}${id}`}>
            <div className={S.imageContainer}>
              {image && (
                <Image
                  data-testid="search-item-image"
                  className={S.image}
                  loader={TMDBPosterLoader}
                  src={image}
                  alt={`Imagem ${name}`}
                  fill
                  sizes="200w"
                  unoptimized={DISABLE_IMAGE_OPTIMIZATION}
                />
              )}
              {!image && <BsImage data-testid="search-item-icon" className={S.imagePerson} />}
            </div>
            {name}
          </a>
        </li>
      )}
    </>
  )
}
