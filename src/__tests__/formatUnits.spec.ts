import { describe, it, expect } from 'vitest'
import { formatWeight, formatHeight } from '@/utils/formatUnits'

describe('formatWeight', () => {
  it('convierte hectogramos a kilogramos con coma decimal', () => {
    const input = 69
    const result = formatWeight(input)
    expect(result).toBe('6,9 kg')
  })
})

describe('formatHeight', () => {
  it('convierte decímetros a metros con coma decimal', () => {
    expect(formatHeight(7)).toBe('0,7 m')
  })
})
