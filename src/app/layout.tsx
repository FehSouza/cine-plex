import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Roboto } from 'next/font/google'
import { Footer, Header } from '../components'
import '../styles/globals.scss'
import S from './styles.module.scss'

// if (process.env.API_MOCK_ENABLED) {
//   // @ts-ignore-next-line
//   await import('@/api_mocks')
// }

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700', '900'] })

export const metadata = {
  title: {
    template: '%s | Cine Plex',
    default: 'Cine Plex',
  },
  description:
    'Cine Plex é uma plataforma para amantes de cinema, onde podem descobrir uma variedade de filmes de diferentes gêneros e épocas. Do clássico ao contemporâneo, do drama à comédia, Cine Plex oferece uma seleção abrangente que atende a todos os gostos.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" id="content" suppressHydrationWarning>
      <body className={roboto.className}>
        <Header />
        <div className={S.container}>
          <div className={S.headerContainer} />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html>
  )
}
