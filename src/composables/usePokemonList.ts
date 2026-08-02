import { ref, computed } from 'vue'
import { pokemonRepository } from '@/services/pokemonService'
import type { PokemonDetail } from '@/types/pokemon'
import { getPokemonDetail } from '@/services/pokemonCache'

const PAGE_SIZE = 20

export function usePokemonList() {
  const pokemons = ref<PokemonDetail[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const total = ref(0)

  const hasMore = computed(() => pokemons.value.length < total.value)

  async function loadMore() {
    if (isLoading.value || (total.value > 0 && !hasMore.value)) return
    isLoading.value = true
    error.value = null
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      const data = await pokemonRepository.getList(PAGE_SIZE, pokemons.value.length)
      total.value = data.count
      const details = await Promise.all(data.results.map((r) => getPokemonDetail(r.name)))
      pokemons.value.push(...details)
    } catch {
      error.value = 'Could not load pokémons. Please try again.'
    } finally {
      isLoading.value = false
    }
  }

  return { pokemons, isLoading, error, hasMore, loadMore }
}
