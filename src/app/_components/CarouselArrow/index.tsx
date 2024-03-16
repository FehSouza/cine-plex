import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import S from './styles.module.scss'

interface CarouselArrowProps {
  prev?: boolean
  hideMobile?: boolean
  hideDesktop?: boolean
  banner?: boolean
  handleClick: () => void
}

export function CarouselArrow({ prev, hideMobile, hideDesktop, banner, handleClick }: CarouselArrowProps) {
  return (
    <button
      data-testid="carousel-arrow"
      aria-label={`Botão de ${prev ? 'voltar' : 'avançar'}`}
      className={[
        S.arrow,
        !prev ? S.next : '',
        hideMobile ? S.hideMobile : '',
        hideDesktop ? S.hideDesktop : '',
        banner ? S.banner : '',
      ].join(' ')}
      onClick={handleClick}
    >
      <div className={S.arrowInternal}>
        {prev ? (
          <IoIosArrowBack data-testid="carousel-arrow-icon-prev" size={18} />
        ) : (
          <IoIosArrowForward data-testid="carousel-arrow-icon-next" size={18} />
        )}
      </div>
    </button>
  )
}
