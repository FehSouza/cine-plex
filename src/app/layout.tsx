import { Roboto } from 'next/font/google'
import '../styles/globals.scss'
import { Footer, Header } from './_components'
import S from './styles.module.scss'

const inter = Roboto({ subsets: ['latin'], weight: ['400', '500', '700', '900'] })

export const metadata = {
  title: 'Cine Plex',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" id="content" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>

      <body className={inter.className}>
        <Header />
        <div className={S.container}>
          <div className={S.headerContainer} />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
