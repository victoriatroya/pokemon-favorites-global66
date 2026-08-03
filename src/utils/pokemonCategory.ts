import type { AbilityDetail, PokemonSpecies } from '@/types/pokemon'

export function getCategory(species: PokemonSpecies): string | null {
  const genus =
    species.genera.find((g) => g.language.name === 'es')?.genus ??
    species.genera.find((g) => g.language.name === 'en')?.genus
  if (!genus) return null
  return genus.replace(/^Pokémon\s+|\s+Pokémon$/gi, '').trim()
}

export function getDescription(species: PokemonSpecies): string | null {
  const entry =
    species.flavor_text_entries.find((e) => e.language.name === 'es') ??
    species.flavor_text_entries.find((e) => e.language.name === 'en')
  if (!entry) return null
  return entry.flavor_text
    .replace(/[\n\f\r]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function getAbilityName(ability: AbilityDetail): string | null {
  return (
    ability.names.find((n) => n.language.name === 'es')?.name ??
    ability.names.find((n) => n.language.name === 'en')?.name ??
    null
  )
}
