import { ref, watch } from 'vue'
import { pokemonRepository } from '@/services/pokemonService'
import { getPokemonDetail } from '@/services/pokemonCache'
import type { PokemonDetail, PokemonListItem } from '@/types/pokemon'

const MAX_RESULTS = 20
const DEBOUNCE_MS = 300
const INDEX_LIMIT = 100000

export function usePokemonSearch() {
  const query = ref('')
  const results = ref<PokemonDetail[]>([])
  const isSearching = ref(false)
  const error = ref<string | null>(null)

  let namesIndex: PokemonListItem[] | null = null
  let debounceTimer: ReturnType<typeof setTimeout> | undefined
  let requestId = 0

  async function ensureIndex(): Promise<PokemonListItem[]> {
    if (!namesIndex) {
      const data = await pokemonRepository.getList(INDEX_LIMIT, 0)
      namesIndex = data.results
    }
    return namesIndex
  }

  async function runSearch(term: string) {
    const id = ++requestId
    isSearching.value = true
    error.value = null
    try {
      const index = await ensureIndex()
      const matches = index.filter((p) => p.name.includes(term)).slice(0, MAX_RESULTS)
      const details = await Promise.all(matches.map((m) => getPokemonDetail(m.name)))
      if (id === requestId) results.value = details
    } catch {
      if (id === requestId) error.value = 'Could not search pokémons. Please try again.'
    } finally {
      if (id === requestId) isSearching.value = false
    }
  }

  watch(query, (value) => {
    clearTimeout(debounceTimer)
    const term = value.trim().toLowerCase()
    if (!term) {
      results.value = []
      error.value = null
      isSearching.value = false
      return
    }
    debounceTimer = setTimeout(() => runSearch(term), DEBOUNCE_MS)
  })

  function searchNow() {
    clearTimeout(debounceTimer)
    const term = query.value.trim().toLowerCase()
    if (!term) return
    runSearch(term)
  }

  return { query, results, isSearching, error, searchNow }
}
