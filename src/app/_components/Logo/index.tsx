import Image from 'next/image'
import Link from 'next/link'
import LogoImg from '../../../../public/logo.svg'
import S from './styles.module.scss'

interface LogoProps {
  hasText?: boolean
  closeMenuMobile?: () => void
}

export const Logo = ({ hasText, closeMenuMobile }: LogoProps) => {
  return (
    <Link data-testid="Logo" className={S.logo} href="/" onClick={closeMenuMobile}>
      <Image width={32} height={32} className={S.image} src={LogoImg} alt="Logo Cine Plex" priority={true} />
      {hasText && 'Cine Plex'}
    </Link>
  )
}
