import { pokemonRepository } from './pokemonService'
import type { PokemonDetail } from '@/types/pokemon'

const cache = new Map<string, PokemonDetail>()

export async function getPokemonDetail(name: string): Promise<PokemonDetail> {
  const hit = cache.get(name)
  if (hit) return hit
  const data = await pokemonRepository.getByName(name)
  cache.set(name, data)
  return data
}
