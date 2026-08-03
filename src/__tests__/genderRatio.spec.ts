import { describe, expect, it } from 'vitest'
import { getGenderRatio } from '@/utils/genderRatio'

describe('genderRatio', () => {
  it('convierte octavos a porcentajes', () => {
    expect(getGenderRatio(1)).toEqual({ male: 87.5, female: 12.5 })
  })

  it('maneja la proporción 50/50', () => {
    expect(getGenderRatio(4)).toEqual({ male: 50, female: 50 })
  })

  it('devuelve null para pokémons sin género', () => {
    expect(getGenderRatio(-1)).toBeNull()
  })
})
