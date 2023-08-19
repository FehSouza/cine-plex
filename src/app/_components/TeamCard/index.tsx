import Image from 'next/image'
import { BsPerson } from 'react-icons/bs'
import { TMDBPosterLoader } from '../Carousel'
import S from './styles.module.scss'

interface TeamListProps {
  id: number
  image: string | undefined
  name: string
  subName: string
}

export default function TeamCard({ id, image, name, subName }: TeamListProps) {
  const subNameFormatted = subName
    .replace('(voice)', '(voz)')
    .replace('(uncredited)', '(sem créditos)')
    .replace('(archive footage)', '(imagens de arquivo)')

  return (
    <li className={S.cardWrapper} key={`cast-${id}`}>
      <a className={S.cardLink} href="" aria-label={`${name}`}>
        <div className={S.ImageWrapper}>
          {image && <Image className={S.image} loader={TMDBPosterLoader} src={image} alt={`Imagem de ${name}`} fill sizes="200w" />}
          {!image && <BsPerson size={32} className={S.imagePerson} />}
        </div>

        <div className={S.infosWrapper}>
          <span className={S.name}>{name}</span>
          <span className={S.subName}>{subNameFormatted}</span>
        </div>
      </a>
    </li>
  )
}
