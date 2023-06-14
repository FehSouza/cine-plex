import Image from 'next/image'
import Link from 'next/link'
import { BsFacebook, BsInstagram, BsYoutube } from 'react-icons/bs'
import Logo from '../../../../public/logo.svg'
import S from './styles.module.scss'

export const Footer = () => {
  return (
    <footer className={S.footer}>
      <div className={S.container}>
        <div className={S.footer__top}>
          <Link className={S.logo} href="/" aria-label="Navegue para a Home">
            <Image className={S.logo__image} src={Logo} alt="Logo Cine Plex" />
            <h2 className={S.logo__name}>Cine Plex</h2>
          </Link>
        </div>

        <div className={S.footer__bottom}>
          <div className={S.infos}>
            <span className={S.infos__title}>Institucional</span>
            <span className={S.infos__item}>Conheça a Cine Plex</span>
            <span className={S.infos__item}>Política de privacidade</span>
            <span className={S.infos__item}>Política de pagamento</span>
            <span className={S.infos__item}>Trocas e devoluções</span>
          </div>

          <div className={S.infos}>
            <span className={S.infos__title}>Minha conta</span>
            <span className={S.infos__item}>Meus dados</span>
            <span className={S.infos__item}>Meus pedidos</span>
          </div>

          <div className={S.infos}>
            <span className={S.infos__title}>Contatos</span>
            <span className={S.infos__item}>(11) 5050-5050</span>
            <span className={S.infos__item}>www.cineplex.com.br</span>

            <div className={S.infos__social}>
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
    </footer>
  )
}
