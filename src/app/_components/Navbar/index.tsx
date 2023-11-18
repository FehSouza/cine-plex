import { handleOpenSearch } from '@/states/openSearch'
import Link from 'next/link'
import { BsSearch } from 'react-icons/bs'
import S from './styles.module.scss'

interface NavbarProps {
  closeMenuMobile?: () => void
}

const menu = [
  { id: 'home', name: 'Home', link: '/' },
  { id: 'depart-1', name: 'Em Cartaz', link: '/cartaz' },
  { id: 'depart-2', name: 'Em Breve', link: '/estreias' },
  { id: 'depart-3', name: 'Nossas Sugestões', link: '/sugestoes' },
]

export const Navbar = ({ closeMenuMobile }: NavbarProps) => {
  return (
    <nav className={S.container}>
      {menu.map((item) => (
        <Link key={item.id} className={[S.item, S[item.id]].join(' ')} href={item.link} onClick={closeMenuMobile}>
          {item.name}
        </Link>
      ))}

      <button className={S.searchButton} aria-label="button-search" onClick={handleOpenSearch}>
        <BsSearch size={20} />
      </button>
    </nav>
  )
}
