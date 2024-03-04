import { describe, it, test, expect } from 'vitest'
import { formatDate } from '.'

describe('formatDate', () => {
  it('deve formatar a data', () => {
    const SUT = formatDate('2024-02-20')
    const expected = '20/02/2024'
    expect(SUT).toBe(expected)
  })

  it('deve retornar a data mesmo que já esteja formatada', () => {
    const SUT1 = formatDate('20/02/2024')
    const expected1 = '20/02/2024'
    expect(SUT1).toBe(expected1)

    const SUT2 = formatDate('2/2/2024')
    const expected2 = '2/2/2024'
    expect(SUT2).toBe(expected2)

    const SUT3 = formatDate('20/2/2024')
    const expected3 = '20/2/2024'
    expect(SUT3).toBe(expected3)

    const SUT4 = formatDate('2/20/2024')
    const expected4 = '2/20/2024'
    expect(SUT4).toBe(expected4)
  })

  test('deve retornar undefined ao passar a data como undefined ou null', () => {
    //@ts-expect-error
    const SUT1 = formatDate(undefined)
    const expected1 = undefined
    expect(SUT1).toBe(expected1)

    //@ts-expect-error
    const SUT2 = formatDate(null)
    const expected2 = undefined
    expect(SUT2).toBe(expected2)
  })

  it('deve retornar undefined ao passar a data como um número', () => {
    //@ts-expect-error
    const SUT = formatDate(2)
    const expected = undefined
    expect(SUT).toBe(expected)
  })

  it('deve retornar undefined ao passar a data com formato errado ou inesperado', () => {
    const SUT = formatDate('2')
    const expected = undefined
    expect(SUT).toBe(expected)
  })

  it('deve retornar undefined ao passar o ano com formato curto (dois dígitos)', () => {
    const SUT1 = formatDate('24-02-13')
    const expected1 = undefined
    expect(SUT1).toBe(expected1)

    const SUT2 = formatDate('13/02/24')
    const expected2 = undefined
    expect(SUT2).toBe(expected2)
  })
})
