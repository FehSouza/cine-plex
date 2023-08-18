'use client'

import { Video } from '@/@types'
import { dispatchInfosVideo } from '@/states/infosVideo'
import { dispatchOpenVideoModal } from '@/states/openVideoModal'
import { BsPlayCircleFill } from 'react-icons/bs'
import S from './styles.module.scss'
interface IframeVideoProps {
  video: Video
  title: string
}

export const VideoIframe = ({ video, title }: IframeVideoProps) => {
  const handleOpenModal = () => {
    dispatchOpenVideoModal(true)
    dispatchInfosVideo({ title, key: video.key })
  }

  return (
    <div className={S.videoWrapper}>
      <div
        className={S.imageVideo}
        onClick={handleOpenModal}
        style={{ backgroundImage: `url('https://i.ytimg.com/vi/${video.key}/hqdefault.jpg')` }}
      />
      <button className={S.buttonOpenModal} aria-label="Botão para abrir o modal de vídeo" onClick={handleOpenModal}>
        <BsPlayCircleFill />
      </button>
    </div>
  )
}

export default VideoIframe
