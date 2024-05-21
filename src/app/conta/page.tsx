import { Metadata } from 'next'
import S from './styles.module.scss'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Conta',
    description: 'Veja informações de sua conta',
  }
}

export default function Account() {
  return (
    <main className={S.main}>
      <div className={S.container}>Conta</div>
    </main>
  )
}
