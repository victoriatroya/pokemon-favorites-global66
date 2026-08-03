import { describe, it, expect } from 'vitest'
import { computeWeaknesses } from '@/utils/computeWeaknesses'
import type { TypeDamageRelations } from '@/types/pokemon'

type Relations = TypeDamageRelations['damage_relations']

// helpers: nombres cortos para armar relations mínimas por test
const n = (name: string) => ({ name })

function relations(overrides: Partial<Relations> = {}): Relations {
  return {
    double_damage_from: [],
    half_damage_from: [],
    no_damage_from: [],
    ...overrides,
  }
}

describe('computeWeaknesses', () => {
  it('un solo tipo: sus double_damage_from son las debilidades', () => {
    const fire = relations({ double_damage_from: [n('water'), n('ground'), n('rock')] })
    expect(computeWeaknesses([fire]).sort()).toEqual(['ground', 'rock', 'water'])
  })

  it('tipos dobles: una resistencia cancela una debilidad (2 × 0.5 = 1)', () => {
    const grass = relations({ double_damage_from: [n('bug'), n('fire')] })
    const poison = relations({ half_damage_from: [n('bug')] })
    const result = computeWeaknesses([grass, poison])
    expect(result).toContain('fire')
    expect(result).not.toContain('bug')
  })

  it('debilidad doble: ambos tipos débiles a lo mismo sigue siendo debilidad (×4)', () => {
    const a = relations({ double_damage_from: [n('ice')] })
    const b = relations({ double_damage_from: [n('ice')] })
    expect(computeWeaknesses([a, b])).toContain('ice')
  })

  it('inmunidad: un ×0 anula cualquier debilidad del otro tipo', () => {
    const a = relations({ double_damage_from: [n('ground')] })
    const b = relations({ no_damage_from: [n('ground')] })
    expect(computeWeaknesses([a, b])).not.toContain('ground')
  })

  it('sin relaciones no hay debilidades', () => {
    expect(computeWeaknesses([relations()])).toEqual([])
  })
})
