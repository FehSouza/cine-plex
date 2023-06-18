import Image from 'next/image'
import Link from 'next/link'
import { BsPerson } from 'react-icons/bs'
import Logo from '../../../../public/logo.svg'
import { Navbar } from '../Navbar'
import S from './styles.module.scss'

export const HeaderDesktop = () => {
  return (
    <header className={S.header}>
      <div className={S.container}>
        <Link className={S.logo} href="/" aria-label="Navegue para a Home">
          <Image className={S.logo__image} src={Logo} alt="Logo Cine Plex" />
        </Link>

        <Navbar />

        <Link className={S.account} href="/conta" aria-label="Navegue para a sua conta">
          <BsPerson className={S.account__image} />
        </Link>
      </div>
    </header>
  )
}
