import { WatchData } from '@/@types'
import Image from 'next/image'
import S from './styles.module.scss'

interface ProvidersToWatchProps {
  providers: WatchData[]
  id: string
  title: string
  titleMovie: string
}

export const ProvidersToWatch = ({ providers, id, title, titleMovie }: ProvidersToWatchProps) => {
  return (
    <div className={S.container}>
      <h2 className={S.title}>{title}</h2>

      <div className={S.content}>
        {providers.map((provider) => (
          <Image
            key={`Watch Provider - ${id} - stream - ${provider.provider_id}`}
            src={`https://www.themoviedb.org/t/p/original${provider.logo_path}`}
            alt={`Assista ${titleMovie} na ${provider.provider_name}`}
            title={`Assista na ${provider.provider_name}`}
            priority
            width={48}
            height={48}
            className={S.image}
          />
        ))}
      </div>
    </div>
  )
}
