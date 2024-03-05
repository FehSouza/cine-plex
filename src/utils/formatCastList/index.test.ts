import { describe, expect, it } from 'vitest'
import { castList } from './index'
import {
  MOCK_GET_CREDITS_MOVIES_EMPTY_CAST_SUCCESS,
  MOCK_GET_CREDITS_MOVIES_EMPTY_CREW_SUCCESS,
  MOCK_GET_CREDITS_MOVIES_SUCCESS,
} from '@/mocks'

const MOCK_CAST_FORMATTED = [
  {
    adult: false,
    gender: 1,
    id: 585211,
    known_for_department: 'Acting',
    name: 'Ko Shibasaki',
    original_name: 'Ko Shibasaki',
    popularity: 38.638,
    profile_path: '/gcuJz8dbYjtgsL8CAWMjVd5R7B9.jpg',
    cast_id: 19,
    character: 'Kiriko (voice)',
    credit_id: '64b0b21bc2bcc60106b4388e',
    order: 2,
  },
  {
    adult: false,
    gender: 1,
    id: 2705230,
    known_for_department: 'Sound',
    name: 'Aimyon',
    original_name: 'Aimyon',
    popularity: 3.973,
    profile_path: '/e1KXoFxJREP3a09C5jpyShjrExT.jpg',
    cast_id: 20,
    character: 'Lady Himi (voice)',
    credit_id: '64b0b2252cde9800cb83d3af',
    order: 3,
  },
]

describe('formatCastList', () => {
  it('deve retornar castList sem duplicatas', () => {
    const SUT = castList({ credits: MOCK_GET_CREDITS_MOVIES_SUCCESS })
    const expected = MOCK_CAST_FORMATTED
    expect(SUT).toStrictEqual(expected)
  })

  it('deve retornar castList sem duplicatas ao passar credits sem crew', () => {
    const SUT = castList({ credits: MOCK_GET_CREDITS_MOVIES_EMPTY_CREW_SUCCESS })
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
    const { cast: _, ...mock } = MOCK_GET_CREDITS_MOVIES_EMPTY_CAST_SUCCESS
    // @ts-expect-error
    const SUT1 = castList({ credits: mock })
    const expected1 = undefined
    expect(SUT1).toBe(expected1)

    const SUT2 = castList({ credits: MOCK_GET_CREDITS_MOVIES_EMPTY_CAST_SUCCESS })
    const expected2 = undefined
    expect(SUT2).toBe(expected2)
  })
})
