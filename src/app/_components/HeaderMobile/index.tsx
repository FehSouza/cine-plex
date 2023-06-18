'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { BsPerson } from 'react-icons/bs'
import { RiCloseCircleFill, RiMenuLine } from 'react-icons/ri'
import Logo from '../../../../public/logo.svg'
import { Navbar } from '../Navbar'
import S from './styles.module.scss'

export const HeaderMobile = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const handleToggleMenu = () => setOpenMenu((prev) => !prev)

  return (
    <header className={S.header}>
      <button className={S.menu__icon} aria-label="Botão do menu mobile" onClick={handleToggleMenu}>
        <RiMenuLine size={28} />
      </button>

      <Link className={S.logo} href="/" aria-label="Navegue para a Home">
        <Image className={S.logo__image} src={Logo} alt="Logo Cine Plex" />
        {'Cine Plex'}
      </Link>

      {openMenu && (
        <div className={S.menu} onClick={handleToggleMenu}>
          <button className={S.menu__close} aria-label="Botão de fechar o menu mobile">
            <RiCloseCircleFill size={32} />
          </button>

          <div className={S.menu__container}>
            <Link className={S.logo} href="/" aria-label="Navegue para a Home">
              <Image className={S.logo__image} src={Logo} alt="Logo Cine Plex" />
              {'Cine Plex'}
            </Link>

            <Link className={S.account} href="/conta" aria-label="Navegue para a sua conta">
              <BsPerson className={S.account__image} />
              {'Minha conta'}
            </Link>

            <Navbar />

            <div className={S.contact}>
              <span className={S.contact__title}>Contatos:</span>
              <span className={S.contact__item}>(11) 5050-5050</span>
              <span className={S.contact__item}>www.cineplex.com.br</span>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
