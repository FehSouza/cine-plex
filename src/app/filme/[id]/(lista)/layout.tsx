import { TeamTabs } from '@/components'
import { DISABLE_IMAGE_OPTIMIZATION } from '@/config'
import { getMovie } from '@/services'
import { loader200 } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { BsImage } from 'react-icons/bs'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import S from './styles.module.scss'

interface RootLayoutProps {
  children: React.ReactNode
  params: { id: string }
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const id = params.id

  const [movie] = await Promise.all([getMovie(id)])
  const poster = movie.poster_path
  const title = movie.title

  return (
    <main className={S.main}>
      <section className={S.container}>
        {poster && (
          <Image
            className={S.infoBarImage}
            loader={loader200}
            src={poster}
            alt={`Poster do Filme ${title}`}
            fill
            priority
            unoptimized={DISABLE_IMAGE_OPTIMIZATION}
          />
        )}

        {!poster && (
          <div className={[S.infoBarImage, S.withoutImagePoster].join(' ')}>
            <BsImage size={32} />
          </div>
        )}

        <div className={S.infoBarWrapper}>
          <h1 className={S.infoBarTitle}>{title}</h1>
          <Link className={S.infoBarBack} href={`/filme/${id}`} aria-label={`Botão para voltar nas informações do Filme ${title}`}>
            <MdKeyboardArrowLeft size={16} /> Voltar
          </Link>
        </div>
      </section>

      <TeamTabs id={id} />

      {children}
    </main>
  )
}
