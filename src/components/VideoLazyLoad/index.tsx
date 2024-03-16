'use client'

import { useState } from 'react'
import { Video } from '../Video'
import { VideoThumbnail } from '../VideoThumbnail'

interface VideoLazyLoadProps {
  videoKey: string
  alt: string
}

export const VideoLazyLoad = ({ videoKey, alt }: VideoLazyLoadProps) => {
  const renderCondition = !!videoKey && !!alt
  const [showVideo, setShowVideo] = useState(false)
  const toggleShowVideo = () => setShowVideo((prev) => !prev)

  return renderCondition ? (
    <>
      {!showVideo && <VideoThumbnail videoKey={videoKey} onClick={toggleShowVideo} />}
      {showVideo && <Video videoKey={videoKey} alt={alt} />}
    </>
  ) : null
}
