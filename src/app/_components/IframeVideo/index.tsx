import { Video } from '@/@types'
interface IframeVideoProps {
  video: Video
}

export const IframeVideo = ({ video }: IframeVideoProps) => {
  return (
    <iframe
      key={video.key}
      width="392"
      height="220.5"
      src={`https://www.youtube.com/embed/${video.key}?iv_load_policy=3&rel=0&showinfo=0`}
      title="YouTube Video Player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  )
}

export default IframeVideo
