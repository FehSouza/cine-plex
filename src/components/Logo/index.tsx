import { DISABLE_IMAGE_OPTIMIZATION } from '@/config'
import Image from 'next/image'
import Link from 'next/link'
import LogoImg from '../../../public/logo.svg'
import S from './styles.module.scss'

interface LogoProps {
  hasText?: boolean
  closeMenuMobile?: () => void
}

export const Logo = ({ hasText, closeMenuMobile }: LogoProps) => {
  return (
    <Link data-testid="logo" className={S.logo} href="/" onClick={closeMenuMobile}>
      <Image
        width={32}
        height={32}
        className={S.image}
        src={LogoImg}
        alt="Logo Cine Plex"
        priority={true}
        unoptimized={DISABLE_IMAGE_OPTIMIZATION}
      />
      {hasText && 'Cine Plex'}
    </Link>
  )
}
