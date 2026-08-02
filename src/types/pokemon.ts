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

interface PokemonAbilities {
  ability: NamedSource
  is_hidden: boolean
  slot: number
}

interface Type {
  type: NamedSource
}

interface OfficialArtwork {
  front_default: string
}

interface PokemonSpritesOther {
  'official-artwork': OfficialArtwork
}

interface PokemonSprites {
  other: PokemonSpritesOther
}

export interface PokemonDetail {
  id: number
  name: string
  weight: number
  height: number
  types: { type: PokemonListItem }[]
  sprites: PokemonSprites
  abilities: PokemonAbilities[]
}

interface PokemonTextEntries {
  flavor_text: string
  language: NamedSource
}

interface PokemonGenera {
  genus: string
  language: NamedSource
}

export interface PokemonSpecies {
  gender_rate: number
  genera: PokemonGenera[]
  flavor_text_entries: PokemonTextEntries[]
}

export interface GenderRatio {
  male: number
  female: number
}

interface NamedSource {
  name: string
}

interface Relations {
  double_damage_from: NamedSource[]
  half_damage_from: NamedSource[]
  no_damage_from: NamedSource[]
}

export interface TypeDamageRelations {
  damage_relations: Relations
}
