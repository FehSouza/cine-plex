import Image from 'next/image'
import Link from 'next/link'
import { BsPerson } from 'react-icons/bs'
import { TMDBPosterLoader } from '../Carousel'
import S from './styles.module.scss'

interface TeamListProps {
  id: number
  image: string | undefined
  name: string
  subName: string
  gender: number
}

export const TeamCard = ({ id, image, name, subName, gender }: TeamListProps) => {
  const subNameFormatted = subName
    .replace('(voice)', '(voz)')
    .replace('(uncredited)', '(sem créditos)')
    .replace('(archive footage)', '(imagens de arquivo)')
    .replace('(archival footage)', '(imagens de arquivo)')
    .replace('Self', `${gender === 1 ? 'Ela própria' : 'Ele próprio'}`)

  return (
    <li className={S.cardWrapper} key={`cast-${id}`}>
      <Link className={S.cardLink} href={`/pessoa/${id}`}>
        <div className={S.ImageWrapper}>
          {image && <Image className={S.image} loader={TMDBPosterLoader} src={image} alt={`Imagem de ${name}`} fill sizes="200w" />}
          {!image && <BsPerson size={32} className={S.imagePerson} />}
        </div>

        <div className={S.infosWrapper}>
          <span className={S.name}>{name}</span>
          <span className={S.subName}>{subNameFormatted}</span>
        </div>
      </Link>
    </li>
  )
}
