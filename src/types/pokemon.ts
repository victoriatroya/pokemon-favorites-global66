export interface PokemonListItem {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
}

export interface PokemonDetail {
  url: string
  id: number
  name: string
  weight: number
  height: number
  types: { type: { name: string } }[]
  sprites: {
    other: {
      'official-artwork': { front_default: string }
    }
  }
}
