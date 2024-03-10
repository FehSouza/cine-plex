'use client'

import Link from 'next/link'
import { Dispatch, SetStateAction, useState } from 'react'
import { BsPerson } from 'react-icons/bs'
import { RiCloseCircleFill } from 'react-icons/ri'
import { Logo } from '../Logo'
import { Navbar } from '../Navbar'
import S from './styles.module.scss'

interface MenuMobileProps {
  openMenu: boolean
  setOpenMenu: Dispatch<SetStateAction<boolean>>
}

export const MenuMobile = ({ openMenu, setOpenMenu }: MenuMobileProps) => {
  const [exitAnimation, setExitAnimation] = useState(false)
  const handleCloseMenu = () => setExitAnimation(true)

  const handleAnimateEnd = () => {
    if (openMenu && !exitAnimation) return
    setOpenMenu(false)
    setExitAnimation(false)
  }

  return (
    <div data-testid="menu-mobile" className={S.menu} onClick={handleCloseMenu}>
      <button
        data-testid="menu-mobile-close-button"
        aria-hidden={exitAnimation}
        className={[S.menuClose, exitAnimation ? S.exitButton : S.openButton].join(' ')}
        aria-label="Botão fechar do menu mobile"
      >
        <RiCloseCircleFill size={36} />
      </button>

      <div
        data-testid="menu-mobile-content"
        aria-hidden={exitAnimation}
        className={[S.menuContainer, exitAnimation ? S.exitMenu : S.openMenu].join(' ')}
        onClick={(e) => e.stopPropagation()}
        onAnimationEnd={handleAnimateEnd}
      >
        <Logo hasText closeMenuMobile={handleCloseMenu} />

        <Link
          data-testid="menu-mobile-account"
          className={S.account}
          href="/conta"
          onClick={handleCloseMenu}
          aria-label="Navegue para a sua conta"
        >
          <BsPerson className={S.accountImage} />
          {'Minha conta'}
        </Link>

        <Navbar closeMenuMobile={handleCloseMenu} />

        <div data-testid="menu-mobile-contact" className={S.contact}>
          <span className={S.contactTitle}>Contatos:</span>
          <span className={S.contactItem}>(11) 5050-5050</span>
          <span className={S.contactItem}>www.cineplex.com.br</span>
        </div>
      </div>
    </div>
  )
}
