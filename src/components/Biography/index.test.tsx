import { MOCK_GET_PERSON } from '@/mocks'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Biography } from '.'

const MOCK_SOCIAL_MEDIA: [string, string | null][] = [
  ['facebook', 'emmawatson'],
  ['instagram', 'EmmaWatson'],
  ['twitter', 'EmmaWatson'],
]

describe('Biography', () => {
  it('deve renderizar o componente Biography', () => {
    render(<Biography person={MOCK_GET_PERSON} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography')).toBeVisible()
  })

  it('deve renderizar o componente Biography com foto', () => {
    render(<Biography person={MOCK_GET_PERSON} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-image')).toBeVisible()
    expect(() => screen.getByTestId('biography-image-person')).toThrow('Unable to find an element')
  })

  it('deve renderizar o componente Biography sem foto', () => {
    const person = { ...MOCK_GET_PERSON, profile_path: null }
    render(<Biography person={person} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-image-person')).toBeVisible()
    expect(() => screen.getByTestId('biography-image')).toThrow('Unable to find an element')
  })

  it('deve renderizar o componente Biography com nome', () => {
    render(<Biography person={MOCK_GET_PERSON} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-name')).toBeVisible()
  })

  it('deve renderizar o componente Biography sem nome', () => {
    const person = { ...MOCK_GET_PERSON, name: '' }
    render(<Biography person={person} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(() => screen.getByTestId('biography-name')).toThrow('Unable to find an element')
  })

  it('deve renderizar o componente Biography com o social media', () => {
    render(<Biography person={MOCK_GET_PERSON} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-social-media')).toBeVisible()
  })

  it('deve renderizar o componente Biography sem o social media', () => {
    render(<Biography person={MOCK_GET_PERSON} quantCredits={2} socialMedia={[]} />)
    expect(() => screen.getByTestId('biography-social-media')).toThrow('Unable to find an element')
  })

  it('deve renderizar o componente Biography com o knownFor', () => {
    const { rerender } = render(<Biography person={MOCK_GET_PERSON} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-known-for')).toBeVisible()

    const person = { ...MOCK_GET_PERSON, gender: 0 }
    rerender(<Biography person={person} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-known-for')).toBeVisible()
  })

  it('deve renderizar o componente Biography com o knownFor - gênero / title', () => {
    const person1 = { ...MOCK_GET_PERSON, gender: 0 }
    const { rerender } = render(<Biography person={person1} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-known-for-title')).toHaveTextContent('Conhecido por')

    const person2 = { ...MOCK_GET_PERSON, gender: 1 }
    rerender(<Biography person={person2} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-known-for-title')).toHaveTextContent('Conhecida por')

    rerender(<Biography person={MOCK_GET_PERSON} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-known-for-title')).toHaveTextContent('Conhecido por')

    const person3 = { ...MOCK_GET_PERSON, gender: undefined }
    // @ts-ignore
    rerender(<Biography person={person3} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-known-for-title')).toHaveTextContent('Conhecido por')
  })

  it('deve renderizar o componente Biography sem o knownFor', () => {
    const person = { ...MOCK_GET_PERSON, known_for_department: '' }
    render(<Biography person={person} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(() => screen.getByTestId('biography-known-for')).toThrow('Unable to find an element')
  })

  it('deve renderizar o componente Biography com o quantCredits', () => {
    const { rerender } = render(<Biography person={MOCK_GET_PERSON} quantCredits={0} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-quant-credits')).toBeVisible()

    const person = { ...MOCK_GET_PERSON, gender: 0 }
    rerender(<Biography person={person} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-quant-credits')).toBeVisible()
  })

  it('deve renderizar o componente Biography com o quantCredits - gênero / title', () => {
    const person1 = { ...MOCK_GET_PERSON, gender: 0 }
    const { rerender } = render(<Biography person={person1} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-quant-credits-title')).toHaveTextContent('Creditado em')

    const person2 = { ...MOCK_GET_PERSON, gender: 1 }
    rerender(<Biography person={person2} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-quant-credits-title')).toHaveTextContent('Creditada em')

    rerender(<Biography person={MOCK_GET_PERSON} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-quant-credits-title')).toHaveTextContent('Creditado em')

    const person3 = { ...MOCK_GET_PERSON, gender: undefined }
    // @ts-ignore
    rerender(<Biography person={person3} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-quant-credits-title')).toHaveTextContent('Creditado em')
  })

  it('deve renderizar o componente Biography com o quantCredits - filme / filmes', () => {
    const { rerender } = render(<Biography person={MOCK_GET_PERSON} quantCredits={0} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-quant-credits')).toHaveTextContent('-')

    rerender(<Biography person={MOCK_GET_PERSON} quantCredits={1} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-quant-credits')).toHaveTextContent('1 filme')

    rerender(<Biography person={MOCK_GET_PERSON} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-quant-credits')).toHaveTextContent('2 filmes')
  })

  it('deve renderizar o componente Biography sem o quantCredits', () => {
    // @ts-ignore
    render(<Biography person={MOCK_GET_PERSON} quantCredits={'2'} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(() => screen.getByTestId('biography-quant-credits')).toThrow('Unable to find an element')
  })

  it('deve renderizar o componente Biography com o gender', () => {
    const { rerender } = render(<Biography person={MOCK_GET_PERSON} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-gender')).toBeVisible()

    const person1 = { ...MOCK_GET_PERSON, gender: undefined }
    // @ts-ignore
    rerender(<Biography person={person1} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-gender')).toBeVisible()

    const person2 = { ...MOCK_GET_PERSON, gender: '0' }
    // @ts-ignore
    rerender(<Biography person={person2} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-gender')).toBeVisible()
  })

  it('deve renderizar o componente Biography com o birthday', () => {
    const { rerender } = render(<Biography person={MOCK_GET_PERSON} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-birthday')).toBeVisible()

    const person1 = { ...MOCK_GET_PERSON, birthday: '23/07/1989' }
    rerender(<Biography person={person1} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-birthday')).toBeVisible()

    const person2 = { ...MOCK_GET_PERSON, birthday: undefined }
    // @ts-ignore
    rerender(<Biography person={person2} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-birthday')).toBeVisible()
  })

  it('deve renderizar o componente Biography com o deathday', () => {
    render(<Biography person={MOCK_GET_PERSON} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-deathday')).toBeVisible()
  })

  it('deve renderizar o componente Biography sem o deathday', () => {
    const person1 = { ...MOCK_GET_PERSON, birthday: '23/07/1989' }
    const { rerender } = render(<Biography person={person1} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(() => screen.getByTestId('biography-deathday')).toThrow('Unable to find an element')

    const person2 = { ...MOCK_GET_PERSON, birthday: undefined }
    // @ts-ignore
    rerender(<Biography person={person2} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(() => screen.getByTestId('biography-deathday')).toThrow('Unable to find an element')

    const person3 = { ...MOCK_GET_PERSON, deathday: '23/07/1989' }
    rerender(<Biography person={person3} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(() => screen.getByTestId('biography-deathday')).toThrow('Unable to find an element')

    const person4 = { ...MOCK_GET_PERSON, deathday: undefined }
    // @ts-ignore
    rerender(<Biography person={person4} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(() => screen.getByTestId('biography-deathday')).toThrow('Unable to find an element')
  })

  it('deve renderizar o componente Biography com o birthplace', () => {
    const { rerender } = render(<Biography person={MOCK_GET_PERSON} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-birthplace')).toBeVisible()

    const person1 = { ...MOCK_GET_PERSON, place_of_birth: '' }
    rerender(<Biography person={person1} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-birthplace')).toBeVisible()

    const person2 = { ...MOCK_GET_PERSON, place_of_birth: undefined }
    // @ts-ignore
    rerender(<Biography person={person2} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-birthplace')).toBeVisible()
  })

  it('deve renderizar o componente Biography sem o alsoKnown', () => {
    const { rerender } = render(<Biography person={MOCK_GET_PERSON} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-without-also-known')).toBeVisible()
    expect(() => screen.getByTestId('biography-also-known-0')).toThrow('Unable to find an element')

    const person1 = { ...MOCK_GET_PERSON, also_known_as: null }
    // @ts-ignore
    rerender(<Biography person={person1} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-without-also-known')).toBeVisible()
    expect(() => screen.getByTestId('biography-also-known-0')).toThrow('Unable to find an element')

    const person3 = { ...MOCK_GET_PERSON, also_known_as: '' }
    // @ts-ignore
    rerender(<Biography person={person3} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-without-also-known')).toBeVisible()
    expect(() => screen.getByTestId('biography-also-known-0')).toThrow('Unable to find an element')
  })

  it('deve renderizar o componente Biography com o alsoKnown', () => {
    const alsoKnownAs = ['a', 'b']
    const person1 = { ...MOCK_GET_PERSON, also_known_as: alsoKnownAs }
    render(<Biography person={person1} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)

    expect(() => screen.getByTestId('biography-without-also-known')).toThrow('Unable to find an element')
    for (let i = 0; i < alsoKnownAs.length; i++) {
      expect(screen.getByTestId(`biography-also-known-${i}`)).toBeVisible()
    }
  })

  it('deve renderizar o componente Biography com o alsoKnown - gênero / title', () => {
    const person1 = { ...MOCK_GET_PERSON, gender: 0 }
    const { rerender } = render(<Biography person={person1} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-also-known-title')).toHaveTextContent('Também conhecido como')

    const person2 = { ...MOCK_GET_PERSON, gender: 1 }
    rerender(<Biography person={person2} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-also-known-title')).toHaveTextContent('Também conhecida como')

    rerender(<Biography person={MOCK_GET_PERSON} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-also-known-title')).toHaveTextContent('Também conhecido como')

    const person3 = { ...MOCK_GET_PERSON, gender: undefined }
    // @ts-ignore
    rerender(<Biography person={person3} quantCredits={2} socialMedia={MOCK_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography-also-known-title')).toHaveTextContent('Também conhecido como')
  })
})
