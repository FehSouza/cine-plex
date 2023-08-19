import Image from 'next/image'
import Link from 'next/link'
import LogoImg from '../../../../public/logo.svg'
import S from './styles.module.scss'

interface LogoProps {
  hasText: boolean
}

export const Logo = ({ hasText }: LogoProps) => {
  return (
    <Link className={S.logo} href="/">
      <Image className={S.image} src={LogoImg} alt="Logo Cine Plex" priority={true} />
      {hasText && 'Cine Plex'}
    </Link>
  )
}
