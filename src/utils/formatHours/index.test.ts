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
  })

  it('deve formatar a hora ao passar o dado como uma string válida', () => {
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
  })

  it('deve dar erro ao passar a hora como undefined ou null', () => {
    //@ts-expect-error
    expect(() => formatHours(undefined)).toThrow('formatHours: a duração não pode ser undefined')
    //@ts-expect-error
    expect(() => formatHours(null)).toThrow('formatHours: a duração não pode ser null')
  })

  it('deve dar erro ao passar o dado como uma string inválida', () => {
    // @ts-expect-error
    expect(() => formatHours('a')).toThrow('formatHours: a duração deve ser um número')
    // @ts-expect-error
    expect(() => formatHours('2h 00min')).toThrow('formatHours: a duração deve ser um número')
  })
})
