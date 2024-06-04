'use client'

import { useMediaQuery } from '@/hooks'
import { useState } from 'react'
import { BsFacebook, BsInstagram, BsYoutube } from 'react-icons/bs'
import { IoIosArrowDown } from 'react-icons/io'
import { Logo } from '../Logo'
import S from './styles.module.scss'

const styleInstitutional = { height: '122px', opacity: '1' }
const styleAccount = { height: '82px', opacity: '1' }
const styleContact = { height: '142px', opacity: '1' }

export const Footer = () => {
  const isBreakpoint = useMediaQuery(768)
  const isDesktop = isBreakpoint === false
  const isMobile = isBreakpoint === true

  const [selected, setSelected] = useState<number | null>(null)

  const handleSelect = (i: number) => {
    if (isDesktop) return
    setSelected((prev) => (prev === i ? null : i))
  }

  const date = new Date()
  const year = date.getFullYear()

  return (
    <footer data-testid="footer" className={S.footer}>
      <div className={S.container}>
        <div data-testid="footer-top" className={S.footerTop}>
          <Logo hasText />
        </div>

        <div data-testid="footer-middle" className={S.footerMiddle}>
          <div className={S.infoWrapper}>
            <div data-testid="footer-middle-button-0" className={S.infoTitle} onClick={() => handleSelect(0)}>
              <span>Institucional</span>
              {isMobile && <IoIosArrowDown size={20} style={selected === 0 ? { transform: 'rotate(180deg)' } : {}} />}
            </div>

            <div data-testid="footer-middle-content-0" className={S.infoContent} style={selected === 0 ? styleInstitutional : {}}>
              <span className={S.infoItem}>Conheça a Cine Plex</span>
              <span className={S.infoItem}>Política de privacidade</span>
              <span className={S.infoItem}>Política de pagamento</span>
            </div>
          </div>

          <div className={S.infoWrapper}>
            <div data-testid="footer-middle-button-1" className={S.infoTitle} onClick={() => handleSelect(1)}>
              <span>Minha conta</span>
              {isMobile && <IoIosArrowDown size={20} style={selected === 1 ? { transform: 'rotate(180deg)' } : {}} />}
            </div>

            <div data-testid="footer-middle-content-1" className={S.infoContent} style={selected === 1 ? styleAccount : {}}>
              <span className={S.infoItem}>Meus dados</span>
              <span className={S.infoItem}>Meus pedidos</span>
            </div>
          </div>

          <div className={S.infoWrapper}>
            <div data-testid="footer-middle-button-2" className={S.infoTitle} onClick={() => handleSelect(2)}>
              <span>Contatos</span>
              {isMobile && <IoIosArrowDown size={20} style={selected === 2 ? { transform: 'rotate(180deg)' } : {}} />}
            </div>

            <div data-testid="footer-middle-content-2" className={S.infoContent} style={selected === 2 ? styleContact : {}}>
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

        <div data-testid="footer-bottom" className={S.footerBottom}>
          <span className={S.brand}>{`© ${year} Cine Plex`}</span>
        </div>
      </div>
    </footer>
  )
}
