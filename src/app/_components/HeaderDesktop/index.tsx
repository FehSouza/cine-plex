import { useOpenSearch } from '@/states/openSearch'
import Link from 'next/link'
import { BsPerson } from 'react-icons/bs'
import { Logo } from '../Logo'
import { Navbar } from '../Navbar'
import { NavbarSearch } from '../NavbarSearch'
import S from './styles.module.scss'

export const HeaderDesktop = () => {
  const [openSearch] = useOpenSearch()

  return (
    <header className={S.header}>
      <div className={S.container}>
        <Logo hasText={false} />

        {openSearch ? <NavbarSearch /> : <Navbar />}

        <Link className={S.account} href="/conta" aria-label="Navegue para a sua conta">
          <BsPerson className={S.accountImage} />
        </Link>
      </div>
    </header>
  )
}
