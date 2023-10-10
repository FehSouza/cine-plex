import { Cast } from '@/@types'
import TeamCard from '../TeamCard'
import S from './styles.module.scss'

interface TeamCastProps {
  list: Cast[]
}

export default function TeamCast({ list }: TeamCastProps) {
  return (
    <ul className={S.listWrapper}>
      {list.map((item) => {
        const id = item.id
        const image = item.profile_path
        const name = item.name
        const subName = item.character

        return <TeamCard key={`cast-${id}`} id={id} image={image} name={name} subName={subName} />
      })}
    </ul>
  )
}
