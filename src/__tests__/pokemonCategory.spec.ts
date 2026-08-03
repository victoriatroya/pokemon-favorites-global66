import { describe, it, expect } from 'vitest'

import { getAbilityName, getCategory, getDescription } from '@/utils/pokemonCategory'
import type { AbilityDetail, PokemonSpecies } from '@/types/pokemon'

function makeSpecies(genera: PokemonSpecies['genera']): PokemonSpecies {
  return { gender_rate: 4, genera, flavor_text_entries: [] }
}

function makeSpeciesDescription(overrides: Partial<PokemonSpecies> = {}): PokemonSpecies {
  return {
    gender_rate: 4,
    genera: [],
    flavor_text_entries: [],
    ...overrides,
  }
}

describe('getCategory', () => {
  it('prefiere la entrada en español y quita el prefijo Pokémon', () => {
    const species = makeSpecies([
      { genus: 'Seed Pokémon', language: { name: 'en' } },
      { genus: 'Pokémon semilla', language: { name: 'es' } },
    ])
    expect(getCategory(species)).toBe('semilla')
  })

  it('cae a inglés cuando no hay español', () => {
    const species = makeSpecies([{ genus: 'Seed Pokémon', language: { name: 'en' } }])
    expect(getCategory(species)).toBe('Seed')
  })

  it('devuelve null cuando no hay entradas', () => {
    expect(getCategory(makeSpecies([]))).toBeNull()
  })
})

describe('getAbilityName', () => {
  it('prefiere el nombre en español', () => {
    const ability: AbilityDetail = {
      names: [
        { name: 'Overgrow', language: { name: 'en' } },
        { name: 'Espesura', language: { name: 'es' } },
      ],
    }
    expect(getAbilityName(ability)).toBe('Espesura')
  })

  it('cae a inglés cuando no hay español', () => {
    const ability: AbilityDetail = {
      names: [{ name: 'Overgrow', language: { name: 'en' } }],
    }
    expect(getAbilityName(ability)).toBe('Overgrow')
  })

  it('devuelve null sin entradas', () => {
    expect(getAbilityName({ names: [] })).toBeNull()
  })
})

describe('getDescription', () => {
  it('prefiere español y limpia los caracteres de control de los juegos', () => {
    const species = makeSpeciesDescription({
      flavor_text_entries: [
        { flavor_text: 'A seed grows\non its back.', language: { name: 'en' } },
        { flavor_text: 'Una semilla\ncrece\fen su lomo.\r', language: { name: 'es' } },
      ],
    })
    expect(getDescription(species)).toBe('Una semilla crece en su lomo.')
  })

  it('cae a inglés cuando no hay español', () => {
    const species = makeSpeciesDescription({
      flavor_text_entries: [{ flavor_text: 'A seed grows on its back.', language: { name: 'en' } }],
    })
    expect(getDescription(species)).toBe('A seed grows on its back.')
  })

  it('devuelve null sin entradas', () => {
    expect(getDescription(makeSpeciesDescription())).toBeNull()
  })
})
