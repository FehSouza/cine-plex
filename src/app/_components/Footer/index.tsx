import { BsFacebook, BsInstagram, BsYoutube } from 'react-icons/bs'
import { Logo } from '../Logo'
import S from './styles.module.scss'

export const Footer = () => {
  return (
    <footer className={S.footer}>
      <div className={S.container}>
        <div className={S.footerTop}>
          <Logo hasText={true} />
        </div>

        <div className={S.footerBottom}>
          <div className={S.infos}>
            <span className={S.infosTitle}>Institucional</span>
            <span className={S.infosItem}>Conheça a Cine Plex</span>
            <span className={S.infosItem}>Política de privacidade</span>
            <span className={S.infosItem}>Política de pagamento</span>
            <span className={S.infosItem}>Trocas e devoluções</span>
          </div>

          <div className={S.infos}>
            <span className={S.infosTitle}>Minha conta</span>
            <span className={S.infosItem}>Meus dados</span>
            <span className={S.infosItem}>Meus pedidos</span>
          </div>

          <div className={S.infos}>
            <span className={S.infosTitle}>Contatos</span>
            <span className={S.infosItem}>(11) 5050-5050</span>
            <span className={S.infosItem}>www.cineplex.com.br</span>

            <div className={S.infosSocial}>
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
