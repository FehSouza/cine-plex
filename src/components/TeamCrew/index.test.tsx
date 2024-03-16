import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TeamCrew } from '.'

const MOCK_CREW_FORMATTED = [
  [
    'Directing',
    [
      {
        adult: false,
        gender: 2,
        id: 608,
        known_for_department: 'Directing',
        name: 'Hayao Miyazaki',
        original_name: 'Hayao Miyazaki',
        popularity: 52.821,
        profile_path: '/mG3cfxtA5jqDc7fpKgyzZMKoXDh.jpg',
        credit_id: '65b6bd2531234500e5da3bd5',
        department: 'Directing',
        job: 'Writer',
      },
    ],
  ],
  [
    'Writing',
    [
      {
        adult: false,
        gender: 2,
        id: 700,
        known_for_department: 'Directing',
        name: 'Hayao Miyazaki',
        original_name: 'Hayao Miyazaki',
        popularity: 52.821,
        profile_path: '/mG3cfxtA5jqDc7fpKgyzZMKoXDh.jpg',
        credit_id: '65cfec1b323eba01493606d2',
        department: 'Writing',
        job: 'Co-Director',
      },
      {
        adult: false,
        gender: 2,
        id: 609,
        known_for_department: 'Directing',
        name: 'Hayao Miyazaki',
        original_name: 'Hayao Miyazaki',
        popularity: 52.821,
        profile_path: '/mG3cfxtA5jqDc7fpKgyzZMKoXDh.jpg',
        credit_id: '65cfec1b323eba01493606d2',
        department: 'Writing',
        job: 'Original Story',
      },
    ],
  ],
]

describe('TeamCrew', () => {
  it('deve renderizar o TeamCrew', () => {
    render(<TeamCrew list={MOCK_CREW_FORMATTED} />)
    for (const item of MOCK_CREW_FORMATTED) {
      expect(screen.getByTestId(`team-crew-${item[0]}`)).toBeVisible()
    }
  })

  it('deve renderizar o TeamCrew com cards se a lista existir', () => {
    render(<TeamCrew list={MOCK_CREW_FORMATTED} />)

    for (const team of MOCK_CREW_FORMATTED) {
      const list = team[1]

      for (const itemList of list) {
        //@ts-expect-error
        expect(screen.getByTestId(`team-card-${itemList.id}`)).toBeVisible()
      }
    }
  })

  it('não deve renderizar o TeamCrew se a lista não existir', () => {
    //@ts-expect-error
    render(<TeamCrew />)
    for (const item of MOCK_CREW_FORMATTED) {
      expect(() => screen.getByTestId(`team-crew-${item[0]}`)).toThrow('Unable to find an element')
    }
  })

  it('não deve renderizar o TeamCrew se a lista for undefined', () => {
    //@ts-expect-error
    render(<TeamCrew list={undefined} />)
    for (const item of MOCK_CREW_FORMATTED) {
      expect(() => screen.getByTestId(`team-crew-${item[0]}`)).toThrow('Unable to find an element')
    }
  })

  it('não deve renderizar o TeamCrew se a lista for null', () => {
    //@ts-expect-error
    render(<TeamCrew list={null} />)
    for (const item of MOCK_CREW_FORMATTED) {
      expect(() => screen.getByTestId(`team-crew-${item[0]}`)).toThrow('Unable to find an element')
    }
  })
})
