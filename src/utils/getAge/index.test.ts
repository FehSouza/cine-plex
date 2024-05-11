import { describe, expect, it } from 'vitest'
import { getAge } from '.'

describe('getAge', () => {
  it('deve retornar a idade ao passar nascimento e falecimento', () => {
    const SUT1 = getAge({ birthday: '1996-11-21', deathday: '2023-03-04' })
    const expected1 = 26
    expect(SUT1).toBe(expected1)

    const SUT2 = getAge({ birthday: '1996-11-21', deathday: '1996-11-21' })
    const expected2 = 0
    expect(SUT2).toBe(expected2)

    const SUT3 = getAge({ birthday: '1996-05-21', deathday: '2024-05-10' })
    const expected3 = 27
    expect(SUT3).toBe(expected3)
  })

  it('deve retornar a idade ao passar nascimento e não passar falecimento', () => {
    const SUT1 = getAge({ birthday: '1996-11-21', deathday: undefined })
    const expected1 = 27
    expect(SUT1).toBe(expected1)

    const SUT2 = getAge({ birthday: '1996-11-21', deathday: null })
    const expected2 = 27
    expect(SUT2).toBe(expected2)

    const SUT3 = getAge({ birthday: '1996-11-21', deathday: '' })
    const expected3 = 27
    expect(SUT3).toBe(expected3)
  })

  it('deve retornar undefined ao não passar nascimento', () => {
    const SUT1 = getAge({ birthday: undefined, deathday: undefined })
    const expected1 = undefined
    expect(SUT1).toBe(expected1)

    const SUT2 = getAge({ birthday: null, deathday: undefined })
    const expected2 = undefined
    expect(SUT2).toBe(expected2)

    const SUT3 = getAge({ birthday: '', deathday: undefined })
    const expected3 = undefined
    expect(SUT3).toBe(expected3)
  })

  it('deve retornar undefined ao passar nascimento ou falecimento fora do formato esperado', () => {
    const SUT1 = getAge({ birthday: '1996/11/21', deathday: '1998-11-21' })
    const expected1 = undefined
    expect(SUT1).toBe(expected1)

    const SUT2 = getAge({ birthday: '21/11/1996', deathday: '1998-11-21' })
    const expected2 = undefined
    expect(SUT2).toBe(expected2)

    const SUT3 = getAge({ birthday: '1996-11-21', deathday: '1998/11/21' })
    const expected3 = undefined
    expect(SUT3).toBe(expected3)

    const SUT4 = getAge({ birthday: '1996-11-21', deathday: '21/11/1998' })
    const expected4 = undefined
    expect(SUT4).toBe(expected4)
  })

  it('deve retornar undefined ao passar o ano com apenas dois dígitos', () => {
    const SUT1 = getAge({ birthday: '96-11-21', deathday: '1998-11-21' })
    const expected1 = undefined
    expect(SUT1).toBe(expected1)

    const SUT2 = getAge({ birthday: '1996-11-21', deathday: '98-11-21' })
    const expected2 = undefined
    expect(SUT2).toBe(expected2)
  })

  it('deve retornar undefined ao passar a data de falecimento maior que a data de nascimento', () => {
    const SUT1 = getAge({ birthday: '1998-11-21', deathday: '1996-11-21' })
    const expected1 = undefined
    expect(SUT1).toBe(expected1)

    const SUT2 = getAge({ birthday: '1996-11-21', deathday: '1996-10-21' })
    const expected2 = undefined
    expect(SUT2).toBe(expected2)

    const SUT3 = getAge({ birthday: '1996-11-21', deathday: '1996-11-20' })
    const expected3 = undefined
    expect(SUT3).toBe(expected3)
  })
})
