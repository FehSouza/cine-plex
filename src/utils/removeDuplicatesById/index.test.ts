import { describe, it, expect } from 'vitest'
import { removeDuplicatesById } from '.'

const MOCK_ARRAY_DUPLICATES = [
  {
    id: 1,
    name: 'bla 1',
  },
  {
    id: 2,
    name: 'bla 2',
  },
  {
    id: 1,
    name: 'bla 3',
  },
]

const MOCK_ARRAY_DUPLICATES_EMPTY_ID = [
  {
    name: 'bla 1',
    age: 20,
  },
  {
    name: 'bla 2',
    age: 21,
  },
  {
    name: 'bla 3',
    age: 22,
  },
]

const MOCK_ARRAY_DUPLICATES_EMPTY_ID_2 = [
  {
    id: 1,
    name: 'bla 3',
  },
  {
    name: 'bla 3',
  },
  {
    id: 2,
    name: 'bla 2',
  },
]

const MOCK_ARRAY = [
  {
    id: 1,
    name: 'bla 3',
  },
  {
    id: 2,
    name: 'bla 2',
  },
]

describe('removeDuplicatesById', () => {
  it('deve retornar uma lista sem duplicatas', () => {
    const SUT = removeDuplicatesById(MOCK_ARRAY_DUPLICATES)
    const expected = MOCK_ARRAY
    expect(SUT).toStrictEqual(expected)

    // @ts-expect-error
    const SUT2 = removeDuplicatesById(MOCK_ARRAY_DUPLICATES_EMPTY_ID_2)
    const expected2 = MOCK_ARRAY
    expect(SUT2).toStrictEqual(expected2)
  })

  it('deve retornar undefined ao não passar lista ou passar uma lista sem itens', () => {
    const SUT1 = removeDuplicatesById([])
    const expected1 = undefined
    expect(SUT1).toBe(expected1)

    // @ts-expect-error
    const SUT2 = removeDuplicatesById(undefined)
    const expected2 = undefined
    expect(SUT2).toBe(expected2)

    // @ts-expect-error
    const SUT3 = removeDuplicatesById(null)
    const expected3 = undefined
    expect(SUT3).toBe(expected3)

    // @ts-expect-error
    const SUT4 = removeDuplicatesById('')
    const expected4 = undefined
    expect(SUT4).toBe(expected4)

    // @ts-expect-error
    const SUT5 = removeDuplicatesById(2)
    const expected5 = undefined
    expect(SUT5).toBe(expected5)
  })

  it('deve retornar undefined ao passar uma lista sem ID em nenhum dos itens', () => {
    // @ts-expect-error
    const SUT = removeDuplicatesById(MOCK_ARRAY_DUPLICATES_EMPTY_ID)
    const expected = undefined
    expect(SUT).toStrictEqual(expected)
  })
})
