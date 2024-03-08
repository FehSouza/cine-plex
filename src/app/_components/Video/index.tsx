import S from './styles.module.scss'

interface VideoProps {
  videoKey: string
  alt: string
}

export const Video = ({ videoKey, alt }: VideoProps) => {
  return (
    <div data-testid="video" className={S.videoWrapper}>
      <iframe
        data-testid="video-iframe"
        className={S.video}
        aria-label={`${alt}`}
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoKey}?&autoplay=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      />
    </div>
  )
}
