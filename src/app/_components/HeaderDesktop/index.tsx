import Link from 'next/link'
import { BsPerson } from 'react-icons/bs'
import { Logo } from '../Logo'
import { Navbar } from '../Navbar'
import S from './styles.module.scss'

export const HeaderDesktop = () => {
  return (
    <header className={S.header}>
      <div className={S.container}>
        <Logo hasText={false} />

        <Navbar />

        <Link className={S.account} href="/conta" aria-label="Navegue para a sua conta">
          <BsPerson className={S.accountImage} />
        </Link>
      </div>
    </header>
  )
}
