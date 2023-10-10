'use client'

import { useMediaQuery } from '@/hooks'
import { useState } from 'react'
import { BsFacebook, BsInstagram, BsYoutube } from 'react-icons/bs'
import { IoIosArrowDown } from 'react-icons/io'
import { Logo } from '../Logo'
import S from './styles.module.scss'

export const Footer = () => {
  const isBreakpoint = useMediaQuery(768)
  const isDesktop = isBreakpoint === false
  const isMobile = isBreakpoint === true

  const [selected, setSelected] = useState<number | null>(null)

  const handleSelect = (i: number) => {
    if (isDesktop) return
    setSelected((prev) => (prev === i ? null : i))
  }

  const styleInstitutional = { height: '122px', opacity: '1' }
  const styleAccount = { height: '82px', opacity: '1' }
  const styleContact = { height: '142px', opacity: '1' }

  return (
    <footer className={S.footer}>
      <div className={S.container}>
        <div className={S.footerTop}>
          <Logo hasText={true} />
        </div>

        <div className={S.footerMiddle}>
          <div className={S.infoWrapper}>
            <div className={S.infoTitle} onClick={() => handleSelect(0)}>
              <span>Institucional</span>
              {isMobile && <IoIosArrowDown size={20} style={selected === 0 ? { transform: 'rotate(180deg)' } : {}} />}
            </div>

            <div className={S.infoContent} style={selected === 0 ? styleInstitutional : {}}>
              <span className={S.infoItem}>Conheça a Cine Plex</span>
              <span className={S.infoItem}>Política de privacidade</span>
              <span className={S.infoItem}>Política de pagamento</span>
            </div>
          </div>

          <div className={S.infoWrapper}>
            <div className={S.infoTitle} onClick={() => handleSelect(1)}>
              <span>Minha conta</span>
              {isMobile && <IoIosArrowDown size={20} style={selected === 1 ? { transform: 'rotate(180deg)' } : {}} />}
            </div>

            <div className={S.infoContent} style={selected === 1 ? styleAccount : {}}>
              <span className={S.infoItem}>Meus dados</span>
              <span className={S.infoItem}>Meus pedidos</span>
            </div>
          </div>

          <div className={S.infoWrapper}>
            <div className={S.infoTitle} onClick={() => handleSelect(2)}>
              <span>Contatos</span>
              {isMobile && <IoIosArrowDown size={20} style={selected === 2 ? { transform: 'rotate(180deg)' } : {}} />}
            </div>

            <div className={S.infoContent} style={selected === 2 ? styleContact : {}}>
              <span className={S.infoItem}>(11) 5050-5050</span>
              <span className={S.infoItem}>www.cineplex.com.br</span>
              <div className={S.infoItem}>
                <a href="https://pt-br.facebook.com/" target="_blank" aria-label="Link para o Facebook">
                  <BsFacebook />
                </a>
                <a href="https://www.instagram.com/" target="_blank" aria-label="Link para o Instagram">
                  <BsInstagram />
                </a>
                <a href="https://www.youtube.com/" target="_blank" aria-label="Link para o YouTube">
                  <BsYoutube />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={S.footerBottom}>
          <span className={S.brand}>© 2023 Cine Plex</span>
        </div>
      </div>
    </footer>
  )
}
