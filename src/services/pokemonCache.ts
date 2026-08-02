import { pokemonRepository } from './pokemonService'
import type { PokemonDetail, PokemonSpecies, TypeDamageRelations } from '@/types/pokemon'

function createCachedFetcher<T>(fetcher: (key: string) => Promise<T>) {
  const cache = new Map<string, Promise<T>>()

  return (key: string): Promise<T> => {
    let promise = cache.get(key)
    if (!promise) {
      promise = fetcher(key).catch((error) => {
        cache.delete(key)
        throw error
      })
      cache.set(key, promise)
    }
    return promise
  }
}

export const getPokemonDetail = createCachedFetcher<PokemonDetail>((name) =>
  pokemonRepository.getByName(name),
)
export const getPokemonSpecies = createCachedFetcher<PokemonSpecies>((name) =>
  pokemonRepository.getSpecies(name),
)
export const getTypeRelations = createCachedFetcher<TypeDamageRelations>((name) =>
  pokemonRepository.getType(name),
)
export const getAbility = createCachedFetcher((name) => pokemonRepository.getAbility(name))
