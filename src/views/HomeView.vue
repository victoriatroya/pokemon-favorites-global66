<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { usePokemonList } from '@/composables/usePokemonList'
import { usePokemonSearch } from '@/composables/usePokemonSearch'
import { useFavoritesStore } from '@/stores/favorite'
import LoadingPokeball from '@/components/ui/LoadingPokeball.vue'
import SearchInput from '@/components/ui/SearchInput.vue'
import PokemonCard from '@/components/pokemon/PokemonCard.vue'
import EmptyState from '@/components/ui/EmptyState.vue'

import imgEmptyState from '@/assets/images/empty-state.svg'

const favorites = useFavoritesStore()

const { pokemons, isLoading, error, loadMore } = usePokemonList()
const { query, results, isSearching, error: searchError, searchNow } = usePokemonSearch()

const isInitialLoading = computed(() => isLoading.value && pokemons.value.length === 0)
const isSearchActive = computed(() => query.value.trim() !== '')

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
    <SearchInput v-model="query" class="mb-6" @submit="searchNow" />

    <template v-if="isSearchActive">
      <p v-if="isSearching" class="text-center text-neutral-mid">Buscando…</p>
      <p v-else-if="searchError" class="text-center text-primary">{{ searchError }}</p>
      <p v-else-if="results.length === 0" class="text-center text-neutral-mid">
        <EmptyState :image="ImgEmptyState" title="No hay resultados para tu  búsqueda" />
      </p>
      <div v-else class="flex flex-col gap-4">
        <PokemonCard
          v-for="p in results"
          :key="p.id"
          :pokemon="p"
          :is-favorite="favorites.isFavorite(p.name)"
          @toggle-favorite="favorites.toggleFavorite(p.name)"
        />
      </div>
    </template>

    <template v-else>
      <p v-if="error" class="text-center text-primary">
        <EmptyState
          :image="imgEmptyState"
          title="Algo salió mal..."
          description="No pudimos cargar la información en este momento. Verifica tu conexión o intenta nuevamente más tarde."
        />
        />
      </p>
      <div v-else class="flex flex-col gap-4">
        <PokemonCard
          v-for="p in pokemons"
          :key="p.id"
          :pokemon="p"
          :is-favorite="favorites.isFavorite(p.name)"
          @toggle-favorite="favorites.toggleFavorite(p.name)"
        />
      </div>
    </template>
  </main>
</template>
