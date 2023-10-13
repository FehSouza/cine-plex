import { BsPlayCircleFill } from 'react-icons/bs'
import S from './styles.module.scss'

interface VideoThumbnailProps {
  videoKey: string
  onClick: () => void
}

export const VideoThumbnail = ({ videoKey, onClick }: VideoThumbnailProps) => {
  return (
    <div className={S.videoWrapper}>
      <div
        className={S.imageVideo}
        onClick={onClick}
        style={{ backgroundImage: `url('https://i.ytimg.com/vi/${videoKey}/hqdefault.jpg')` }}
      />

      <button className={S.buttonOpenModal} aria-label="Botão para abrir o modal de vídeo" onClick={onClick}>
        <BsPlayCircleFill />
      </button>
    </div>
  )
}
