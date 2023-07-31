'use client'

import { Video } from '@/@types'
import { useState } from 'react'
interface IframeVideoProps {
  video: Video
  title: string
}

export const IframeVideo = ({ video, title }: IframeVideoProps) => {
  console.log(video)
  const [videoShow, setVideoShow] = useState(false)

  return (
    <>
      <div
        onClick={() => setVideoShow(!videoShow)}
        style={{
          backgroundImage: `url('https://i.ytimg.com/vi/${video.key}/hqdefault.jpg')`,
          width: 520,
          height: 300,
          backgroundRepeat: 'no-repeat',
        }}
      ></div>

      {videoShow && (
        <object
          aria-label={`Trailer do Filme ${title}`}
          width="592"
          height="333"
          data={`https://www.youtube.com/embed/${video.key}`}
        ></object>
      )}

      {/* <iframe
        width="592"
        height="333"
        src={`https://www.youtube.com/embed/${video.key}?iv_load_policy=3&rel=0&showinfo=0`}
        title="YouTube Video Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      /> */}
    </>
  )
}

export default IframeVideo
