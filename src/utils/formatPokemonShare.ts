import type { PokemonDetail } from '@/types/pokemon'

export function formatPokemonShare(p: PokemonDetail): string {
  const types = p.types.map((t) => t.type.name).join(', ')
  return `${p.name}, weight: ${p.weight}, height: ${p.height}, types: ${types}`
}
