'use client'

import { ImageLoader } from 'next/image'

export const staticLoader =
  (value: number): ImageLoader =>
  ({ src, width }) => {
    const valueFormatted = !!value ? `w${value}` : 'original'

    const DICTIONARY_WIDTH = {
      640: valueFormatted,
      750: valueFormatted,
      828: valueFormatted,
      1080: valueFormatted,
      1200: valueFormatted,
      1920: valueFormatted,
      2048: valueFormatted,
      3840: valueFormatted,
    }

    return `https://image.tmdb.org/t/p/${DICTIONARY_WIDTH[width as keyof typeof DICTIONARY_WIDTH]}${src}`
  }

export const loaderOriginal = staticLoader(0)
export const loader200 = staticLoader(200)
