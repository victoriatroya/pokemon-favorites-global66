<script setup lang="ts">
import { computed, onMounted, useTemplateRef, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePokemonList } from '@/composables/usePokemonList'
import { usePokemonSearch } from '@/composables/usePokemonSearch'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import { useFavoritesStore } from '@/stores/favorite'
import LoadingPokeball from '@/components/ui/LoadingPokeball.vue'
import SearchInput from '@/components/ui/SearchInput.vue'
import PokemonCard from '@/components/pokemon/PokemonCard.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import TypeFilterModal from '@/components/pokemon/TypeFilterModal.vue'

import imgEmptyState from '@/assets/images/empty-state.svg'

const router = useRouter()
const sentinel = useTemplateRef<HTMLElement>('sentinel')
const showFilter = ref(false)
const selectedTypes = ref<string[]>([])

const favorites = useFavoritesStore()

const { pokemons, isLoading, error, loadMore, hasMore } = usePokemonList()
const { query, results, isSearching, error: searchError, searchNow } = usePokemonSearch()
useInfiniteScroll(sentinel, loadMore)

const isInitialLoading = computed(() => isLoading.value && pokemons.value.length === 0)
const isSearchActive = computed(() => query.value.trim() !== '')

const filteredPokemons = computed(() => {
  if (selectedTypes.value.length === 0) return pokemons.value
  return pokemons.value.filter((p) =>
    p.types.some((t) => selectedTypes.value.includes(t.type.name)),
  )
})

onMounted(loadMore)
</script>

<template>
  <div
    v-if="isInitialLoading"
    class="min-h-screen flex items-center justify-center bg-neutral-light"
  >
    <LoadingPokeball />
  </div>

  <main v-else class="min-h-screen w-full max-w-2xl mx-auto px-4 py-6 bg-neutral-light">
    <div class="mb-6 flex items-center gap-3">
      <SearchInput v-model="query" class="flex-1" @submit="searchNow" />
      <button
        type="button"
        class="cursor-pointer relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white shadow-sm"
        aria-label="Filtrar por tipo"
        @click="showFilter = true"
      >
        <svg
          class="h-5 w-5 text-neutral-mid"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <path d="M4 6h16M7 12h10M10 18h4" />
        </svg>
      </button>
    </div>
    <div
      v-if="selectedTypes.length > 0"
      class="mb-4 flex items-center justify-between text-sm text-neutral-mid"
    >
      <span>
        {{ filteredPokemons.length === 1 ? 'Se ha encontrado' : 'Se han encontrado' }}
        {{ filteredPokemons.length }}
        {{ filteredPokemons.length === 1 ? 'resultado' : 'resultados' }}
      </span>
      <button
        type="button"
        class="cursor-pointer font-semibold text-blue hover:text-blue-dark"
        @click="selectedTypes = []"
      >
        Borrar filtro
      </button>
    </div>
    <template v-if="isSearchActive">
      <p v-if="isSearching" class="text-center text-neutral-mid">Buscando…</p>
      <p v-else-if="searchError" class="text-center text-primary">{{ searchError }}</p>
      <EmptyState
        v-else-if="results.length === 0"
        :image="imgEmptyState"
        title="No hay resultados para tu búsqueda"
      />
      <div v-else class="grid grid-cols-1 gap-4">
        <PokemonCard
          v-for="p in results"
          :key="p.id"
          :pokemon="p"
          :is-favorite="favorites.isFavorite(p.name)"
          @toggle-favorite="favorites.toggleFavorite(p.name)"
          @select="router.push({ name: 'pokemon-detail', params: { name: p.name } })"
        />
      </div>
    </template>

    <template v-else>
      <EmptyState
        v-if="error"
        :image="imgEmptyState"
        title="Algo salió mal..."
        description="No pudimos cargar la información en este momento. Verifica tu conexión o intenta nuevamente más tarde."
      >
        <template #action>
          <button
            type="button"
            class="cursor-pointer rounded-full bg-blue px-10 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-blue-dark"
            @click="loadMore"
          >
            Reintentar
          </button>
        </template>
      </EmptyState>
      <EmptyState
        v-else-if="filteredPokemons.length === 0 && selectedTypes.length > 0"
        :image="imgEmptyState"
        title="No encontramos coincidencias con tu búsqueda"
      />
      <div v-else class="grid grid-cols-1 gap-4">
        <PokemonCard
          v-for="p in filteredPokemons"
          :key="p.id"
          :pokemon="p"
          :is-favorite="favorites.isFavorite(p.name)"
          @toggle-favorite="favorites.toggleFavorite(p.name)"
          @select="router.push({ name: 'pokemon-detail', params: { name: p.name } })"
        />
        <div v-if="selectedTypes.length === 0" ref="sentinel" class="flex justify-center py-6">
          <LoadingPokeball v-if="isLoading" size-class="h-12 w-12" />
          <p v-else-if="!hasMore" class="text-sm text-neutral-mid">No hay más pokémons</p>
        </div>
      </div>
    </template>
  </main>
  <TypeFilterModal v-if="showFilter" v-model="selectedTypes" @close="showFilter = false" />
</template>
