import { describe, expect, it } from 'vitest'
import { clamp } from '.'

describe('numbers', () => {
  it('clamp - deve retornar a página passada', () => {
    const page1 = 1
    const SUT1 = clamp(page1, 1, 5)
    expect(SUT1).toBe(1)

    const page2 = 3
    const SUT2 = clamp(page2, 1, 5)
    expect(SUT2).toBe(3)

    const page3 = 5
    const SUT3 = clamp(page3, 1, 5)
    expect(SUT3).toBe(5)
  })

  it('clamp - deve retornar a última página - page fornecida é maior que o máximo de páginas', () => {
    const page = 10
    const SUT = clamp(page, 1, 5)
    expect(SUT).toBe(5)
  })

  it('clamp - deve retornar a primeira página - page fornecida é menor que o mínimo de páginas', () => {
    const page = 0
    const SUT = clamp(page, 1, 5)
    expect(SUT).toBe(1)
  })
})
