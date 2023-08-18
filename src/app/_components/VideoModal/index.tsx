'use client'

import { useInfosVideo } from '@/states/infosVideo'
import { dispatchOpenVideoModal, useOpenVideoModal } from '@/states/openVideoModal'
import { RiCloseCircleFill } from 'react-icons/ri'
import S from './styles.module.scss'

export const VideoModal = () => {
  const [openModal] = useOpenVideoModal()
  const [infosVideo] = useInfosVideo()

  const handleCloseModal = () => dispatchOpenVideoModal(false)

  return (
    <>
      {openModal && (
        <div className={S.modalContainer} onClick={handleCloseModal}>
          <div className={S.modalContent} onClick={(e) => e.stopPropagation()}>
            <object
              aria-label={`Trailer do Filme ${infosVideo.title}`}
              width="592"
              height="333"
              data={`https://www.youtube.com/embed/${infosVideo.key}`}
            ></object>
            <button className={S.buttonCloseModal} aria-label="Botão para fechar o modal de vídeo" onClick={handleCloseModal}>
              <RiCloseCircleFill />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
