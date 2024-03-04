import { describe, expect, it } from 'vitest'
import { formatReleaseDate } from '.'

describe('formatReleaseDate', () => {
  it('deve formatar o ano', () => {
    const SUT = formatReleaseDate('2024-02-13')
    const expected = '2024'
    expect(SUT).toBe(expected)
  })

  it('deve retornar undefined ao passar a data como undefined ou null', () => {
    //@ts-expect-error
    const SUT1 = formatReleaseDate(undefined)
    const expected1 = undefined
    expect(SUT1).toBe(expected1)

    //@ts-expect-error
    const SUT2 = formatReleaseDate(null)
    const expected2 = undefined
    expect(SUT2).toBe(expected2)
  })

  it('deve retornar undefined ao passar a data como uma string vazia', () => {
    const SUT = formatReleaseDate('')
    const expected = undefined
    expect(SUT).toBe(expected)
  })

  it('deve retornar undefined ao passar a data com formato errado ou inesperado', () => {
    const SUT = formatReleaseDate('13/02/2024')
    const expected = undefined
    expect(SUT).toBe(expected)
  })

  it('deve retornar undefined ao passar o ano com formato curto (dois dígitos)', () => {
    const SUT = formatReleaseDate('24-02-13')
    const expected = undefined
    expect(SUT).toBe(expected)
  })

  it('deve dar erro ao passar a data como um número', () => {
    //@ts-expect-error
    const SUT = formatReleaseDate(2)
    const expected = undefined
    expect(SUT).toBe(expected)
  })
})
