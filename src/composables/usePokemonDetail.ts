import { ref } from 'vue'
import { pokemonRepository } from '@/services/pokemonService'
import type { PokemonDetail } from '@/types/pokemon'

const cache = new Map<string, PokemonDetail>()

export function usePokemonDetail() {
  const detail = ref<PokemonDetail | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchDetail(name: string) {
    error.value = null
    const cached = cache.get(name)
    if (cached) {
      detail.value = cached
      return
    }
    isLoading.value = true
    try {
      const data = await pokemonRepository.getByName(name)
      cache.set(name, data)
      detail.value = data
    } catch {
      error.value = 'Could not load pokémon details.'
    } finally {
      isLoading.value = false
    }
  }

  return { detail, isLoading, error, fetchDetail }
}
