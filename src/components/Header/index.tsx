'use client'

import { useMediaQuery } from '@/hooks'
import { HeaderDesktop } from '../HeaderDesktop'
import { HeaderMobile } from '../HeaderMobile'

export const Header = () => {
  const isBreakpoint = useMediaQuery(768)
  const isDesktop = isBreakpoint === false
  const isMobile = isBreakpoint === true

  return (
    <>
      {isDesktop && <HeaderDesktop />}
      {isMobile && <HeaderMobile />}
    </>
  )
}
