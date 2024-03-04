import { describe, expect, it } from 'vitest'
import { formatHours } from '.'

describe('formatHours', () => {
  it('deve formatar a hora', () => {
    const SUT1 = formatHours(120)
    const expected1 = '2h 00min'
    expect(SUT1).toBe(expected1)

    const SUT2 = formatHours(2)
    const expected2 = '02min'
    expect(SUT2).toBe(expected2)

    const SUT3 = formatHours(20)
    const expected3 = '20min'
    expect(SUT3).toBe(expected3)

    const SUT4 = formatHours(0.5)
    const expected4 = '01min'
    expect(SUT4).toBe(expected4)

    const SUT5 = formatHours(0)
    const expected5 = '00min'
    expect(SUT5).toBe(expected5)
  })

  it('deve formatar ao passar a hora como uma string válida', () => {
    // @ts-expect-error
    const SUT1 = formatHours('120')
    const expected1 = '2h 00min'
    expect(SUT1).toBe(expected1)

    // @ts-expect-error
    const SUT2 = formatHours('2')
    const expected2 = '02min'
    expect(SUT2).toBe(expected2)

    // @ts-expect-error
    const SUT3 = formatHours('02')
    const expected3 = '02min'
    expect(SUT3).toBe(expected3)

    // @ts-expect-error
    const SUT4 = formatHours('20')
    const expected4 = '20min'
    expect(SUT4).toBe(expected4)

    // @ts-expect-error
    const SUT5 = formatHours('0.5')
    const expected5 = '01min'
    expect(SUT5).toBe(expected5)

    // @ts-expect-error
    const SUT6 = formatHours('0')
    const expected6 = '00min'
    expect(SUT6).toBe(expected6)
  })

  it('deve retornar undefined ao passar a hora como undefined ou null', () => {
    //@ts-expect-error
    const SUT1 = formatHours(undefined)
    const expected1 = undefined
    expect(SUT1).toBe(expected1)

    //@ts-expect-error
    const SUT2 = formatHours(null)
    const expected2 = undefined
    expect(SUT2).toBe(expected2)
  })

  it('deve retornar undefined ao passar a hora como uma string vazia', () => {
    //@ts-expect-error
    const SUT = formatHours('')
    const expected = undefined
    expect(SUT).toBe(expected)
  })

  it('deve retornar undefined ao passar a hora como uma string inválida', () => {
    //@ts-expect-error
    const SUT1 = formatHours('a')
    const expected1 = undefined
    expect(SUT1).toBe(expected1)

    //@ts-expect-error
    const SUT2 = formatHours('2h 00min')
    const expected2 = undefined
    expect(SUT2).toBe(expected2)
  })

  it('deve retornar undefined ao passar a hora como um número negativo', () => {
    const SUT1 = formatHours(-120)
    const expected1 = undefined
    expect(SUT1).toBe(expected1)

    //@ts-expect-error
    const SUT2 = formatHours('-120')
    const expected2 = undefined
    expect(SUT2).toBe(expected2)
  })
})
