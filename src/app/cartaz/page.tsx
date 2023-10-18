import { getFullNowPlaying } from '@/services'
import { Department } from '../_components'
import S from './styles.module.scss'

interface TheatersProps {
  params: {}
  searchParams: {
    page: string
  }
}

export default async function Theaters(props: TheatersProps) {
  const page = props.searchParams.page

  const [nowPlaying] = await Promise.all([getFullNowPlaying({ page: page ?? '1' })])

  return (
    <main className={S.main}>
      <Department title={'Filmes em Cartaz'} movies={nowPlaying} />
    </main>
  )
}
