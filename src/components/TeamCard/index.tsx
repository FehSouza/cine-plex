import { DISABLE_IMAGE_OPTIMIZATION } from '@/config'
import { loader200 } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { BsPerson } from 'react-icons/bs'
import S from './styles.module.scss'

interface TeamListProps {
  id: number
  image: string | undefined | null
  name: string
  subName: string
  gender: number
}

export const TeamCard = ({ id, image, name, subName, gender }: TeamListProps) => {
  const subNameFormatted = subName
    ?.replace('(voice)', '(voz)')
    .replace('(uncredited)', '(sem créditos)')
    .replace('(archive footage)', '(imagens de arquivo)')
    .replace('(archival footage)', '(imagens de arquivo)')
    .replace('Self', `${gender === 1 ? 'Ela própria' : 'Ele próprio'}`)

  return (
    <li data-testid={`team-card-${id}`} className={S.cardWrapper}>
      <Link data-testid="team-card-link" className={S.cardLink} href={`/pessoa/${id}`}>
        <div className={S.ImageWrapper}>
          {image && (
            <Image
              data-testid="team-card-image"
              className={S.image}
              loader={loader200}
              src={image}
              alt={`Imagem de ${name}`}
              fill
              unoptimized={DISABLE_IMAGE_OPTIMIZATION}
            />
          )}
          {!image && <BsPerson data-testid="team-card-image-icon" size={32} className={S.imagePerson} />}
        </div>

        <div className={S.infosWrapper}>
          <span data-testid="team-card-name" className={S.name}>
            {name}
          </span>
          <span data-testid="team-card-sub-name" className={S.subName}>
            {subNameFormatted}
          </span>
        </div>
      </Link>
    </li>
  )
}
