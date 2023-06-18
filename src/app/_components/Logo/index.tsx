import Image from 'next/image'
import Link from 'next/link'
import LogoImg from '../../../../public/logo.svg'
import S from './styles.module.scss'

interface LogoProps {
  hasText: boolean
}

export const Logo = ({ hasText }: LogoProps) => {
  return (
    <Link className={S.logo} href="/" aria-label="Navegue para a Home">
      <Image className={S.image} src={LogoImg} alt="Logo Cine Plex" />
      {hasText && 'Cine Plex'}
    </Link>
  )
}
