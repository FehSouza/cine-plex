import { DICTIONARY_CREW_DEPARTMENT, DICTIONARY_GENDER } from '@/dictionary'
import { getPerson, getPersonCredits, getSocialMedia } from '@/services'
import { formatDate, getAge, removeDuplicates } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs'
import S from './styles.module.scss'

interface PersonProps {
  params: { id: string }
}

export default async function Person({ params }: PersonProps) {
  const id = params.id

  const [person, socialMedia, credits] = await Promise.all([getPerson(id), getSocialMedia(id), getPersonCredits(id)])

  const name = person.name
  const image = person.profile_path
  const imageSrc = `https://image.tmdb.org/t/p/w300${image}`
  const biography = person.biography
  const birthday = person.birthday
  const deathday = person.deathday
  const age = getAge({ birthday, deathday })
  const birthplace = person.place_of_birth
  const gender = person.gender as keyof typeof DICTIONARY_GENDER
  const knownFor = person.known_for_department as keyof typeof DICTIONARY_CREW_DEPARTMENT

  const setCredit = new Set()
  const listCredits = [...credits.cast, ...credits.crew]
  const listCreditsFormatted = listCredits.filter((credit) => removeDuplicates({ item: credit, set: setCredit }))

  return (
    <main className={S.main}>
      <aside className={[S.container, S.containerLeft].join(' ')}>
        <Image className={S.image} src={imageSrc} alt={`Imagem de ${name}`} width={264} height={396} priority />

        <h1 className={[S.title, S.titleMobile].join(' ')}>{name}</h1>

        <section className={S.socialMedia}>
          {socialMedia.map((item) => {
            const platform = item[0]
            const link = item[1]

            return (
              <div className={S.socialMediaItem} key={`${platform}-${id}`}>
                {platform === 'facebook' && (
                  <Link href={`https://www.facebook.com/${link}`} aria-label={`Link Facebook ${name}`} target="_blank">
                    <BsFacebook size={22} />
                    <span className={S.socialMediaTooltip}>{`Acessar Facebook`}</span>
                  </Link>
                )}

                {platform === 'instagram' && (
                  <Link href={`https://www.instagram.com/${link}`} aria-label={`Link Instagram ${name}`} target="_blank">
                    <BsInstagram size={22} />
                    <span className={S.socialMediaTooltip}>{`Acessar Instagram`}</span>
                  </Link>
                )}

                {platform === 'twitter' && (
                  <Link href={`https://twitter.com/${link}`} aria-label={`Link Twitter ${name}`} target="_blank">
                    <BsTwitter size={22} />
                    <span className={S.socialMediaTooltip}>{`Acessar Twitter`}</span>
                  </Link>
                )}
              </div>
            )
          })}
        </section>

        <section className={S.personalInfo}>
          <h2 className={S.subTitle}>Informações pessoais</h2>

          <div className={S.personalInfoWrapper}>
            <h3 className={S.subTitle2}>Conhecido(a) por</h3>
            <span className={S.text}>{DICTIONARY_CREW_DEPARTMENT[knownFor]}</span>
          </div>

          <div className={S.personalInfoWrapper}>
            <h3 className={S.subTitle2}>Creditado(a) em</h3>
            <span className={S.text}>{listCreditsFormatted.length}</span>
          </div>

          <div className={S.personalInfoWrapper}>
            <h3 className={S.subTitle2}>Gênero</h3>
            <span className={S.text}>{DICTIONARY_GENDER[gender]}</span>
          </div>

          <div className={S.personalInfoWrapper}>
            <h3 className={S.subTitle2}>Nascimento</h3>
            <span className={S.text}>{`${formatDate(birthday)} ${!deathday ? `(${age} anos de idade)` : ''}`}</span>
          </div>

          {deathday && (
            <div className={S.personalInfoWrapper}>
              <h3 className={S.subTitle2}>Falecimento</h3>
              <span className={S.text}>{`${formatDate(deathday)} (${age} anos de idade)`}</span>
            </div>
          )}

          <div className={S.personalInfoWrapper}>
            <h3 className={S.subTitle2}>Local de nascimento</h3>
            <span className={S.text}>{birthplace}</span>
          </div>
        </section>
      </aside>

      <section className={[S.container, S.containerRight].join(' ')}>
        <h1 className={[S.title, S.titleDesktop].join(' ')}>{name}</h1>
      </section>
    </main>
  )
}
