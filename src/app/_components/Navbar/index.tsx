import Link from 'next/link'
import S from './styles.module.scss'

const menu = [
  { id: 'depart-1', name: 'Em Cartaz', link: '/cartaz' },
  { id: 'depart-2', name: 'Em Breve', link: '/estreias' },
  { id: 'depart-3', name: 'Nossas Sugestões', link: '/sugestoes' },
]

export const Navbar = () => {
  return (
    <nav className={S.container}>
      {menu.map((item) => (
        <Link key={item.id} className={S.item} href={item.link}>
          {item.name}
        </Link>
      ))}
    </nav>
  )
}
