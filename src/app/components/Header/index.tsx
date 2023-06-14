'use client'

import Image from 'next/image'
import Link from 'next/link'
import { BsPerson } from 'react-icons/bs'
import Logo from '../../../../public/logo.svg'
import S from './styles.module.scss'

const menu = [
  { id: 'depart-1', name: 'Em Cartaz', link: '/cartaz' },
  { id: 'depart-2', name: 'Próximas Estreias', link: '/estreias' },
  { id: 'depart-3', name: 'Nossas Sugestões', link: '/sugestoes' },
]

const getWindowSize = () => {
  if (typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined') {
    return { width: window.innerWidth }
  }
  return { width: 0 }
}

const resize = () => {
  if (typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined') {
    window.addEventListener('resize', () => {
      const size = getWindowSize()
      const isMobile = size.width <= 768
      console.log(isMobile)
      return isMobile
    })
  }
}

export const Header = () => {
  const size = resize()

  return (
    <header className={S.header}>
      <div className={S.container}>
        <Link className={S.logo} href="/" aria-label="Navegue para a Home">
          <Image className={S.logo__image} src={Logo} alt="Logo Cine Plex" />
        </Link>

        <nav className={S.navbar}>
          {menu.map((item) => (
            <Link key={item.id} href={item.link}>
              <li className={S.navbar__item}>{item.name}</li>
            </Link>
          ))}
        </nav>

        <Link className={S.account} href="/conta" aria-label="Navegue para a sua conta">
          <BsPerson className={S.account__image} />
        </Link>
      </div>
    </header>
  )
}
