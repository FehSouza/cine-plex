'use client'

import Link from 'next/link'
import { useState } from 'react'
import { BsPerson } from 'react-icons/bs'
import { RiCloseCircleFill, RiMenuLine } from 'react-icons/ri'
import { Logo } from '../Logo'
import { Navbar } from '../Navbar'
import S from './styles.module.scss'

export const HeaderMobile = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const [exitAnimation, setExitAnimation] = useState(false)

  const handleOpenMenu = () => setOpenMenu(true)
  const handleCloseMenu = () => setExitAnimation(true)

  const handleAnimateEnd = () => {
    if (openMenu && !exitAnimation) return
    setOpenMenu(false)
    setExitAnimation(false)
  }

  return (
    <header className={S.header}>
      <button className={S.menuIcon} aria-label="Botão do menu mobile" onClick={handleOpenMenu}>
        <RiMenuLine size={28} />
      </button>

      <Logo hasText={true} />

      {openMenu && (
        <div className={S.menu} onClick={handleCloseMenu}>
          <button className={[S.menuClose, exitAnimation ? S.exitButton : S.openButton].join(' ')} aria-label="Botão fechar do menu mobile">
            <RiCloseCircleFill size={32} />
          </button>

          <div
            className={[S.menuContainer, exitAnimation ? S.exitMenu : S.openMenu].join(' ')}
            onClick={(e) => e.stopPropagation()}
            onAnimationEnd={handleAnimateEnd}
          >
            <Logo hasText={true} closeMenuMobile={handleCloseMenu} />

            <Link className={S.account} href="/conta" onClick={handleCloseMenu} aria-label="Navegue para a sua conta">
              <BsPerson className={S.accountImage} />
              {'Minha conta'}
            </Link>

            <Navbar closeMenuMobile={handleCloseMenu} />

            <div className={S.contact}>
              <span className={S.contactTitle}>Contatos:</span>
              <span className={S.contactItem}>(11) 5050-5050</span>
              <span className={S.contactItem}>www.cineplex.com.br</span>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
