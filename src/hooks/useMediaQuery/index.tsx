import { useCallback, useEffect, useState } from 'react'

export const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState<null | boolean>(null)

  const updateTarget = useCallback((e: any) => {
    e.matches ? setTargetReached(true) : setTargetReached(false)
  }, [])

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`)
    media.addEventListener('change', updateTarget)
    setTargetReached((prev) => (prev === null ? media.matches : prev))

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) setTargetReached(true)

    return () => media.removeEventListener('change', updateTarget)
  }, [updateTarget, width])

  return targetReached
}
