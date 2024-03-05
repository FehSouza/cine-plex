import { describe, expect, it } from 'vitest'
import { crewList } from '.'
import {
  MOCK_GET_CREDITS_MOVIES_EMPTY_CAST_SUCCESS,
  MOCK_GET_CREDITS_MOVIES_EMPTY_CREW_SUCCESS,
  MOCK_GET_CREDITS_MOVIES_SUCCESS,
} from '@/mocks'

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

describe('formatCrewList', () => {
  it('deve retornar crewList sem duplicatas e formatada', () => {
    const SUT = crewList({ credits: MOCK_GET_CREDITS_MOVIES_SUCCESS })
    const expected = MOCK_CREW_FORMATTED
    expect(SUT).toStrictEqual(expected)
  })

  it('deve retornar crewList sem duplicatas ao passar credits sem cast', () => {
    const SUT = crewList({ credits: MOCK_GET_CREDITS_MOVIES_EMPTY_CAST_SUCCESS })
    const expected = MOCK_CREW_FORMATTED
    expect(SUT).toStrictEqual(expected)
  })

  it('deve retornar undefined ao não passar credits', () => {
    // @ts-expect-error
    const SUT1 = crewList({ credits: undefined })
    const expected1 = undefined
    expect(SUT1).toBe(expected1)

    // @ts-expect-error
    const SUT2 = crewList({ credits: null })
    const expected2 = undefined
    expect(SUT2).toBe(expected2)

    // @ts-expect-error
    const SUT3 = crewList({ credits: '' })
    const expected3 = undefined
    expect(SUT3).toBe(expected3)
  })

  it('deve retornar undefined ao passar credits sem crew ou crew sem conteúdo', () => {
    const { crew: _, ...mock } = MOCK_GET_CREDITS_MOVIES_EMPTY_CREW_SUCCESS
    // @ts-expect-error
    const SUT1 = crewList({ credits: mock })
    const expected1 = undefined
    expect(SUT1).toBe(expected1)

    const SUT2 = crewList({ credits: MOCK_GET_CREDITS_MOVIES_EMPTY_CREW_SUCCESS })
    const expected2 = undefined
    expect(SUT2).toBe(expected2)
  })
})
