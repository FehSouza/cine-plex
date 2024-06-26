import { WatchData } from '@/@types'
import { DISABLE_IMAGE_OPTIMIZATION } from '@/config'
import { loaderOriginal } from '@/utils'
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
    <div data-testid="providers-to-watch" className={S.container}>
      {title && (
        <h2 data-testid="providers-to-watch-title" className={S.title}>
          {title}
        </h2>
      )}

      <div className={S.content}>
        {providers.map((provider) => {
          const providerId = provider.provider_id
          const providerName = provider.provider_name
          const providerLogo = provider.logo_path

          return (
            <div
              data-testid={`providers-to-watch-image-container-${providerId}`}
              key={`Watch Provider - ${id} - stream - ${providerId}`}
              className={S.imageWrapper}
            >
              <Image
                data-testid={`providers-to-watch-image-${providerId}`}
                className={S.image}
                loader={loaderOriginal}
                src={providerLogo}
                alt={`Assista ${titleMovie} na ${providerName}`}
                title={`Assista na ${providerName}`}
                fill
                unoptimized={DISABLE_IMAGE_OPTIMIZATION}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
