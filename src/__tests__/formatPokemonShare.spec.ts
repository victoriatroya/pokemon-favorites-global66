import { describe, it, expect } from 'vitest'
import { formatPokemonShare } from '@/utils/formatPokemonShare'
import type { PokemonDetail } from '@/types/pokemon'

const bulbasaur = {
  id: 1,
  name: 'bulbasaur',
  weight: 69,
  height: 7,
  types: [
    { type: { name: 'grass', url: 'https://test.co/api/v2/type/grass' } },
    { type: { name: 'poison', url: 'https://test.co/api/v2/type/poison' } },
  ],
  sprites: { other: { 'official-artwork': { front_default: '' } } },
  abilities: [],
} as PokemonDetail

describe('formatPokemonShare', () => {
  it('formatea nombre y atributos separados por coma', () => {
    expect(formatPokemonShare(bulbasaur)).toBe(
      'bulbasaur, weight: 69, height: 7, types: grass, poison',
    )
  })

  it('maneja pokemon de un solo tipo', () => {
    const charmander = {
      ...bulbasaur,
      name: 'charmander',
      types: [{ type: { name: 'fire', url: 'https://test.co/api/v2/type/grass' } }],
    } as PokemonDetail

    expect(formatPokemonShare(charmander)).toBe('charmander, weight: 69, height: 7, types: fire')
  })
})
