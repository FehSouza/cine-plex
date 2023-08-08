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
  return (
    <li className={S.cardWrapper} key={`cast-${id}`}>
      <a className={S.cardLink} href="" aria-label={`Link para a página de detalhes de ${name}`}>
        <div className={S.ImageWrapper}>
          {image && <Image className={S.image} loader={TMDBPosterLoader} src={image} alt={`Imagem de ${name}`} fill sizes="200w" />}
          {!image && <BsPerson size={32} className={S.imagePerson} />}
        </div>

        <div className={S.infosWrapper}>
          <span className={S.name}>{name}</span>
          <span className={S.subName}>{subName}</span>
        </div>
      </a>
    </li>
  )
}
