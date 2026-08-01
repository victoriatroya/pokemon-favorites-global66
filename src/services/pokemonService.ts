import type { PokemonListResponse, PokemonDetail } from '@/types/pokemon'

const BASE_URL = 'https://pokeapi.co/api/v2'

export interface IPokemonRepository {
  getList(limit: number, offset: number): Promise<PokemonListResponse>
  getByName(name: string): Promise<PokemonDetail>
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json() as Promise<T>
}

export const pokemonRepository: IPokemonRepository = {
  getList(limit = 20, offset = 0) {
    return fetchJson<PokemonListResponse>(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)
  },
  getByName(name: string) {
    return fetchJson<PokemonDetail>(`${BASE_URL}/pokemon/${name.toLowerCase()}`)
  },
}
