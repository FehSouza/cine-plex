import { ReactElement } from 'react'
import { Footer } from '../Footer'
import { Header } from '../Header'
import S from './styles.module.scss'

interface LayoutProps {
  children: ReactElement
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <div className={S.container}>
        <main className={S.main}>
          <div className={S.content}>{children}</div>
        </main>
        <Footer />
      </div>
    </>
  )
}
