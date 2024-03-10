'use client'

import { handleOpenSearch, useOpenSearch } from '@/states/openSearch'
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { RiMenuLine } from 'react-icons/ri'
import { Logo } from '../Logo'
import { MenuMobile } from '../MenuMobile'
import { NavbarSearch } from '../NavbarSearch'
import S from './styles.module.scss'

export const HeaderMobile = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const [openSearch] = useOpenSearch()
  const handleOpenMenu = () => setOpenMenu(true)

  return (
    <header className={S.header} data-testid="header-mobile">
      <button data-testid="header-mobile-menu-button" className={S.menuIcon} aria-label="Botão do menu mobile" onClick={handleOpenMenu}>
        <RiMenuLine size={28} />
      </button>

      <Logo hasText />

      <button
        data-testid="header-mobile-search-button"
        className={[S.searchButton, openMenu ? S.opacity25 : '', openSearch ? S.opacity0 : ''].join(' ')}
        aria-label="button-search"
        onClick={handleOpenSearch}
      >
        <BsSearch size={20} />
      </button>

      {openSearch && (
        <div className={S.navbarSearchContainer}>
          <NavbarSearch isMobile={true} />
        </div>
      )}

      {openMenu && <MenuMobile openMenu={openMenu} setOpenMenu={setOpenMenu} />}
    </header>
  )
}
