import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TeamCast } from '.'

const MOCK_CAST_FORMATTED = [
  {
    adult: false,
    gender: 2,
    id: 934,
    known_for_department: 'Acting',
    name: 'Russell Crowe',
    original_name: 'Russell Crowe',
    popularity: 75.413,
    profile_path: '/fbzD4utSGJlsV8XbYMLoMdEZ1Fc.jpg',
    cast_id: 1,
    character: 'Roy Freeman',
    credit_id: '630ff0267fcab30091db5a3b',
    order: 0,
  },
  {
    adult: false,
    gender: 1,
    id: 543261,
    known_for_department: 'Acting',
    name: 'Karen Gillan',
    original_name: 'Karen Gillan',
    popularity: 57.935,
    profile_path: '/rWx8u4F4aYIqmjJDeMK78ysPsu0.jpg',
    cast_id: 14,
    character: 'Laura Baines',
    credit_id: '63f0849d52497800dc431088',
    order: 1,
  },
  {
    adult: false,
    gender: 2,
    id: 20982,
    known_for_department: 'Acting',
    name: 'Marton Csokas',
    original_name: 'Marton Csokas',
    popularity: 27.936,
    profile_path: '/jKtjjwf8MHnUsQ3YA56LH9pJjee.jpg',
    cast_id: 15,
    character: 'Joseph Wieder',
    credit_id: '63f084a615376c008bbfb819',
    order: 2,
  },
  {
    adult: false,
    gender: 2,
    id: 2478,
    known_for_department: 'Acting',
    name: 'Tommy Flanagan',
    original_name: 'Tommy Flanagan',
    popularity: 42.087,
    profile_path: '/5OnvT1KpEk3juZavqOCSAEYOtwl.jpg',
    cast_id: 19,
    character: 'Jimmy Remis',
    credit_id: '641ca84e24b33300b880f40e',
    order: 3,
  },
  {
    adult: false,
    gender: 2,
    id: 1212871,
    known_for_department: 'Directing',
    name: 'Thomas M. Wright',
    original_name: 'Thomas M. Wright',
    popularity: 6.451,
    profile_path: '/nVBUjQvFHjzkz9Bz6BXAJ8c7XFD.jpg',
    cast_id: 17,
    character: 'Wayne Devereaux',
    credit_id: '63f084b3a24c5000d4e3267e',
    order: 4,
  },
  {
    adult: false,
    gender: 2,
    id: 1510769,
    known_for_department: 'Acting',
    name: 'Harry Greenwood',
    original_name: 'Harry Greenwood',
    popularity: 3.332,
    profile_path: '/bTTjxIacR1a9GPVx2SkieZYHvbF.jpg',
    cast_id: 16,
    character: 'Richard Finn',
    credit_id: '63f084ad4a4bfc009637a541',
    order: 5,
  },
  {
    adult: false,
    gender: 1,
    id: 1046233,
    known_for_department: 'Acting',
    name: 'Elizabeth Blackmore',
    original_name: 'Elizabeth Blackmore',
    popularity: 25.691,
    profile_path: '/8IFEnd9hBbrQOleqTvjyuTlfQXu.jpg',
    cast_id: 20,
    character: 'Dana Olsen',
    credit_id: '642f1b04724de10077e72e0e',
    order: 6,
  },
  {
    adult: false,
    gender: 1,
    id: 2321639,
    known_for_department: 'Acting',
    name: 'Lynn Gilmartin',
    original_name: 'Lynn Gilmartin',
    popularity: 3.61,
    profile_path: '/p6PZzaUmtTpZqsTRZem5FcbI2eZ.jpg',
    cast_id: 21,
    character: 'Red',
    credit_id: '642f1b539661fc00b61a93f2',
    order: 7,
  },
  {
    adult: false,
    gender: 1,
    id: 209871,
    known_for_department: 'Acting',
    name: 'Jane Harber',
    original_name: 'Jane Harber',
    popularity: 4.019,
    profile_path: '/2PMmfOTr5tFTjXtYHx9942Cqbky.jpg',
    cast_id: 22,
    character: 'Catherine Finn',
    credit_id: '642f1b6112425c00b79a3ea2',
    order: 8,
  },
  {
    adult: false,
    gender: 1,
    id: 1525897,
    known_for_department: 'Acting',
    name: 'Ming-Zhu Hii',
    original_name: 'Ming-Zhu Hii',
    popularity: 4.972,
    profile_path: '/5LcH2RaJJpmyztVS1XpJG673ftQ.jpg',
    cast_id: 23,
    character: 'Dr. Margaret Xu',
    credit_id: '642f1b73724de100d3316a14',
    order: 9,
  },
  {
    adult: false,
    gender: 1,
    id: 2056675,
    known_for_department: 'Acting',
    name: 'Lucy-Rose Leonard',
    original_name: 'Lucy-Rose Leonard',
    popularity: 1.969,
    profile_path: '/xYDLxVcP97iVvhFRxTCDayFJGFC.jpg',
    cast_id: 24,
    character: 'Lulu',
    credit_id: '642f1b7e2975ca01149f56f6',
    order: 10,
  },
  {
    adult: false,
    gender: 2,
    id: 1576672,
    known_for_department: 'Acting',
    name: 'Pacharo Mzembe',
    original_name: 'Pacharo Mzembe',
    popularity: 2.633,
    profile_path: '/lXeEgdThQ8eqFiAv6HTwqJn6AU5.jpg',
    cast_id: 25,
    character: 'Isaac Samuel',
    credit_id: '642f1b8f9661fc00971052ed',
    order: 11,
  },
  {
    adult: false,
    gender: 2,
    id: 75745,
    known_for_department: 'Acting',
    name: 'Simon Maiden',
    original_name: 'Simon Maiden',
    popularity: 3.688,
    profile_path: '/w2SahJdB4BCDKGvn7zrYF9JBcVo.jpg',
    cast_id: 26,
    character: 'Eddie Finn',
    credit_id: '642f1b9fd036b600bd293bec',
    order: 12,
  },
  {
    adult: false,
    gender: 1,
    id: 1535052,
    known_for_department: 'Acting',
    name: 'Paula Arundell',
    original_name: 'Paula Arundell',
    popularity: 2.326,
    profile_path: '/6npQiQjcjhBItCqKObvuhS261A6.jpg',
    cast_id: 27,
    character: 'Susan Avery',
    credit_id: '642f1baf12425c00b79a3eb7',
    order: 13,
  },
  {
    adult: false,
    gender: 2,
    id: 187016,
    known_for_department: 'Acting',
    name: 'Jasper Bagg',
    original_name: 'Jasper Bagg',
    popularity: 4.058,
    profile_path: '/fJTpfS6yK78XbO8LWXnXK1Supdm.jpg',
    cast_id: 28,
    character: "O'Toole",
    credit_id: '642f1bbf724de101118d340c',
    order: 14,
  },
]

describe('TeamCast', () => {
  it('deve renderizar o TeamCast', () => {
    render(<TeamCast list={MOCK_CAST_FORMATTED} />)
    expect(screen.getByTestId('team-cast')).toBeVisible()
  })

  it('deve renderizar o TeamCast com cards se a lista existir', () => {
    render(<TeamCast list={MOCK_CAST_FORMATTED} />)
    for (const item of MOCK_CAST_FORMATTED) {
      expect(screen.getByTestId(`team-card-${item.id}`)).toBeVisible()
    }
  })

  it('deve renderizar o TeamCast sem cards se a lista não existir', () => {
    //@ts-expect-error
    render(<TeamCast />)
    const teamCast = screen.getByTestId('team-cast')
    expect(teamCast.children.length).toBe(0)
  })

  it('deve renderizar o TeamCast sem cards se a lista for undefined', () => {
    //@ts-expect-error
    render(<TeamCast list={undefined} />)
    const teamCast = screen.getByTestId('team-cast')
    expect(teamCast.children.length).toBe(0)
  })

  it('deve renderizar o TeamCast sem cards se a lista for null', () => {
    //@ts-expect-error
    render(<TeamCast list={null} />)
    const teamCast = screen.getByTestId('team-cast')
    expect(teamCast.children.length).toBe(0)
  })
})
