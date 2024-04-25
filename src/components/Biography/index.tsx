import { Person } from '@/@types'
import { DICTIONARY_CREW_DEPARTMENT, DICTIONARY_GENDER } from '@/dictionary'
import { formatDate, getAge } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { BsFacebook, BsInstagram, BsPerson, BsTwitter } from 'react-icons/bs'
import S from './styles.module.scss'

interface BiographyProps {
  person: Person
  quantCredits: number
  socialMedia: string[][]
}

export const Biography = ({ person, quantCredits, socialMedia }: BiographyProps) => {
  const id = person.id
  const name = person.name
  const image = person.profile_path ? `https://image.tmdb.org/t/p/w300${person.profile_path}` : null
  const birthday = !/\d{4}-\d{1,2}-\d{1,2}/.test(person.birthday) ? '' : person.birthday
  const deathday = !/\d{4}-\d{1,2}-\d{1,2}/.test(person.deathday) ? '' : person.deathday
  const age = getAge({ birthday, deathday })
  const birthplace = person.place_of_birth
  const gender = person.gender as keyof typeof DICTIONARY_GENDER
  const knownFor = person.known_for_department as keyof typeof DICTIONARY_CREW_DEPARTMENT
  const alsoKnown = person.also_known_as
  const quantCreditsText = quantCredits === 1 ? `${quantCredits} filme` : `${quantCredits} filmes`

  return (
    <section data-testid="biography" className={S.container}>
      <div className={S.imageWrapper}>
        {!!image && (
          <Image
            data-testid="biography-image"
            className={S.image}
            src={image}
            alt={`Imagem de ${name}`}
            width={264}
            height={396}
            priority
          />
        )}
        {!image && <BsPerson data-testid="biography-image-person" size={48} className={S.imagePerson} />}
      </div>

      {!!name && (
        <h1 data-testid="biography-name" className={S.titleMobile}>
          {name}
        </h1>
      )}

      {!!socialMedia?.length && (
        <div data-testid="biography-social-media" className={S.socialMedia}>
          {socialMedia.map((item) => {
            const platform = item[0]
            const link = item[1]

            return (
              <div className={S.socialMediaItem} key={`${id}-${platform}`}>
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
        </div>
      )}

      <div className={S.personalInfo}>
        <h2 className={S.title}>Informações pessoais</h2>

        {!!knownFor && (
          <div className={S.personalInfoWrapper}>
            <h3 className={S.subTitle}>{`${gender === 1 ? 'Conhecida' : 'Conhecido'} por`}</h3>
            <span data-testid="biography-known-for" className={S.text}>
              {DICTIONARY_CREW_DEPARTMENT[knownFor]}
            </span>
          </div>
        )}

        {typeof quantCredits === 'number' && (
          <div className={S.personalInfoWrapper}>
            <h3 className={S.subTitle}>{`${gender === 1 ? 'Creditada' : 'Creditado'} em`}</h3>
            <span data-testid="biography-quant-credits" className={S.text}>
              {quantCredits === 0 ? '-' : quantCreditsText}
            </span>
          </div>
        )}

        <div className={S.personalInfoWrapper}>
          <h3 className={S.subTitle}>Gênero</h3>
          <span data-testid="biography-gender" className={S.text}>
            {DICTIONARY_GENDER[gender] ? DICTIONARY_GENDER[gender] : `-`}
          </span>
        </div>

        <div className={S.personalInfoWrapper}>
          <h3 className={S.subTitle}>Nascimento</h3>
          <span data-testid="biography-birthday" className={S.text}>
            {birthday ? `${formatDate(birthday)} ${!deathday ? `(${age} anos)` : ''}` : '-'}
          </span>
        </div>

        {deathday && birthday && age && (
          <div className={S.personalInfoWrapper}>
            <h3 className={S.subTitle}>Falecimento</h3>
            <span data-testid="biography-deathday" className={S.text}>{`${formatDate(deathday)} (${age} anos)`}</span>
          </div>
        )}

        <div className={S.personalInfoWrapper}>
          <h3 className={S.subTitle}>Local de nascimento</h3>
          <span data-testid="biography-birthplace" className={S.text}>
            {birthplace ? birthplace : '-'}
          </span>
        </div>

        <div className={S.personalInfoWrapper}>
          <h3 className={S.subTitle}>{`Também ${gender === 1 ? 'conhecida' : 'conhecido'} como`}</h3>

          {!alsoKnown?.length && (
            <span data-testid="biography-without-also-known" className={S.text}>
              -
            </span>
          )}

          {!!alsoKnown?.length &&
            alsoKnown.map((name, index) => (
              <span data-testid={`biography-also-known-${index}`} key={`${id}-${name}-${index}`} className={S.text}>
                {name}
              </span>
            ))}
        </div>
      </div>
    </section>
  )
}
