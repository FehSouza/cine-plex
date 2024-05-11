import { MOCK_GET_CREDITS_MOVIE, MOCK_GET_CREDITS_MOVIE_EMPTY_CAST, MOCK_GET_CREDITS_MOVIE_EMPTY_CREW } from '@/mocks'
import { describe, expect, it } from 'vitest'
import { castList } from './index'

const MOCK_CAST_FORMATTED = [
  {
    adult: false,
    gender: 2,
    id: 73457,
    known_for_department: 'Acting',
    name: 'Chris Pratt',
    original_name: 'Chris Pratt',
    popularity: 43.844,
    profile_path: '/83o3koL82jt30EJ0rz4Bnzrt2dd.jpg',
    cast_id: 21,
    character: 'Garfield (voice)',
    credit_id: '61805556c7c2240043b16390',
    order: 0,
  },
  {
    adult: false,
    gender: 2,
    id: 2231,
    known_for_department: 'Acting',
    name: 'Samuel L. Jackson',
    original_name: 'Samuel L. Jackson',
    popularity: 64.903,
    profile_path: '/nCJJ3NVksYNxIzEHcyC1XziwPVj.jpg',
    cast_id: 22,
    character: 'Vic (voice)',
    credit_id: '628d16e39a643500aaf9ee54',
    order: 1,
  },
  {
    adult: false,
    gender: 2,
    id: 210172,
    known_for_department: 'Acting',
    name: 'Harvey Guillén',
    original_name: 'Harvey Guillén',
    popularity: 16.786,
    profile_path: '/yiNBonobPwqMVweB02JWufzp2l9.jpg',
    cast_id: 63,
    character: 'Odie (voice)',
    credit_id: '65541fb753866e00abaa5fee',
    order: 2,
  },
  {
    adult: false,
    gender: 2,
    id: 3292,
    known_for_department: 'Acting',
    name: 'Nicholas Hoult',
    original_name: 'Nicholas Hoult',
    popularity: 35.566,
    profile_path: '/laeAYQVBV9U3DkJ1B4Cn1XhpT8P.jpg',
    cast_id: 61,
    character: 'Jon Arbuckle (voice)',
    credit_id: '65541f8b9653f613f863dc75',
    order: 3,
  },
  {
    adult: false,
    gender: 1,
    id: 1278487,
    known_for_department: 'Acting',
    name: 'Hannah Waddingham',
    original_name: 'Hannah Waddingham',
    popularity: 48.291,
    profile_path: '/eHAICyhvjiRZCgzKyJCk9hWnnjr.jpg',
    cast_id: 31,
    character: 'Jinx (voice)',
    credit_id: '62fd2c2f7cffda0092ddf0f2',
    order: 4,
  },
  {
    adult: false,
    gender: 2,
    id: 21422,
    known_for_department: 'Acting',
    name: 'Brett Goldstein',
    original_name: 'Brett Goldstein',
    popularity: 14.941,
    profile_path: '/xYdFNE7EkncE8uiPJzT3RrkqcAQ.jpg',
    cast_id: 64,
    character: 'Roland (voice)',
    credit_id: '65541fbf903c5200e1f03875',
    order: 5,
  },
  {
    adult: false,
    gender: 2,
    id: 1564920,
    known_for_department: 'Acting',
    name: 'Bowen Yang',
    original_name: 'Bowen Yang',
    popularity: 11.135,
    profile_path: '/lrebxaz4BGJucBW79cakZ0HsSa1.jpg',
    cast_id: 65,
    character: 'Nolan (voice)',
    credit_id: '65541fc70816c700c3daebce',
    order: 6,
  },
  {
    adult: false,
    gender: 2,
    id: 10182,
    known_for_department: 'Acting',
    name: 'Ving Rhames',
    original_name: 'Ving Rhames',
    popularity: 30.337,
    profile_path: '/ohAOsD8E4tu35PI2buzZORpn9Ef.jpg',
    cast_id: 32,
    character: 'Otto (voice)',
    credit_id: '62fd2c3b94d8a8008232864e',
    order: 7,
  },
  {
    adult: false,
    gender: 1,
    id: 1093919,
    known_for_department: 'Acting',
    name: 'Cecily Strong',
    original_name: 'Cecily Strong',
    popularity: 17.038,
    profile_path: '/g1WbsojbgQAB72UfUJnNWPaB4b5.jpg',
    cast_id: 62,
    character: 'Marge (voice)',
    credit_id: '65541fad9653f613f629f241',
    order: 8,
  },
  {
    adult: false,
    gender: 1,
    id: 2692283,
    known_for_department: 'Acting',
    name: 'Janelle James',
    original_name: 'Janelle James',
    popularity: 7.911,
    profile_path: '/vLiXGdCRCfWhamrPdUGYiBRZk6y.jpg',
    cast_id: 74,
    character: 'Olivia (voice)',
    credit_id: '6604323a770700017c11cabd',
    order: 9,
  },
  {
    adult: false,
    gender: 2,
    id: 19767,
    known_for_department: 'Acting',
    name: 'Snoop Dogg',
    original_name: 'Snoop Dogg',
    popularity: 22.55,
    profile_path: '/rbxBK2m6fEq0oHeMoBUMVYkJEdJ.jpg',
    cast_id: 73,
    character: 'Snoop Catt (voice)',
    credit_id: '65e5e0f3006b010186a3566c',
    order: 10,
  },
  {
    adult: false,
    gender: 0,
    id: 3485760,
    known_for_department: 'Acting',
    name: 'Dev Joshi',
    original_name: 'Dev Joshi',
    popularity: 0.715,
    profile_path: null,
    cast_id: 78,
    character: 'Liz (voice)',
    credit_id: '661f290e20af77017d3eb536',
    order: 11,
  },
  {
    adult: false,
    gender: 0,
    id: 2673495,
    known_for_department: 'Acting',
    name: 'Lynsey Murrell',
    original_name: 'Lynsey Murrell',
    popularity: 1.535,
    profile_path: '/7vVmOYrjiIJPD7se4ugNOL1OaMt.jpg',
    cast_id: 79,
    character: 'Tour Guide Tracy (voice)',
    credit_id: '661f2925a39d0b013154c79d',
    order: 12,
  },
  {
    adult: false,
    gender: 0,
    id: 1360218,
    known_for_department: 'Acting',
    name: 'Alicia Grace Turrell',
    original_name: 'Alicia Grace Turrell',
    popularity: 2.887,
    profile_path: null,
    cast_id: 80,
    character: 'Ethel (voice)',
    credit_id: '661f29310816c7017cef2561',
    order: 13,
  },
  {
    adult: false,
    gender: 0,
    id: 2839160,
    known_for_department: 'Acting',
    name: 'Luke Cinque-White',
    original_name: 'Luke Cinque-White',
    popularity: 2.986,
    profile_path: null,
    cast_id: 81,
    character: 'Vito (voice)',
    credit_id: '661f293e96670e0163d923c2',
    order: 14,
  },
]

describe('formatCastList', () => {
  it('deve retornar castList sem duplicatas', () => {
    const SUT = castList({ credits: MOCK_GET_CREDITS_MOVIE })
    const expected = MOCK_CAST_FORMATTED
    expect(SUT).toStrictEqual(expected)
  })

  it('deve retornar castList sem duplicatas ao passar credits sem crew', () => {
    const SUT = castList({ credits: MOCK_GET_CREDITS_MOVIE_EMPTY_CREW })
    const expected = MOCK_CAST_FORMATTED
    expect(SUT).toStrictEqual(expected)
  })

  it('deve retornar undefined ao não passar credits', () => {
    // @ts-expect-error
    const SUT1 = castList({ credits: undefined })
    const expected1 = undefined
    expect(SUT1).toBe(expected1)

    // @ts-expect-error
    const SUT2 = castList({ credits: null })
    const expected2 = undefined
    expect(SUT2).toBe(expected2)

    // @ts-expect-error
    const SUT3 = castList({ credits: '' })
    const expected3 = undefined
    expect(SUT3).toBe(expected3)
  })

  it('deve retornar undefined ao passar credits sem cast ou cast sem conteúdo', () => {
    const { cast: _, ...mock } = MOCK_GET_CREDITS_MOVIE_EMPTY_CAST
    // @ts-expect-error
    const SUT1 = castList({ credits: mock })
    const expected1 = undefined
    expect(SUT1).toBe(expected1)

    const SUT2 = castList({ credits: MOCK_GET_CREDITS_MOVIE_EMPTY_CAST })
    const expected2 = undefined
    expect(SUT2).toBe(expected2)
  })
})
