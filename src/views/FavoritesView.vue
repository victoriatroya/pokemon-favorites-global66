<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFavoritesStore } from '@/stores/favorite'
import { getPokemonDetail } from '@/services/pokemonCache'
import type { PokemonDetail } from '@/types/pokemon'
import PokemonCard from '@/components/pokemon/PokemonCard.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import emptyFavorites from '@/assets/images/empty-state.svg'

const favoritesStore = useFavoritesStore()
const pokemons = ref<PokemonDetail[]>([])
const error = ref<string | null>(null)

watch(
  () => [...favoritesStore.favorites],
  async (names) => {
    error.value = null
    try {
      pokemons.value = await Promise.all(names.map((n) => getPokemonDetail(n)))
    } catch {
      error.value = 'No pudimos cargar tus favoritos.'
    }
  },
  { immediate: true },
)
</script>

<template>
  <main class="min-h-screen w-full max-w-2xl mx-auto px-4 py-6 bg-neutral-light">
    <EmptyState
      v-if="pokemons.length === 0 && !error"
      :image="emptyFavorites"
      title="No has marcado ningún Pokémon como favorito"
      description="Haz clic en el ícono de corazón de tus Pokémon favoritos y aparecerán aquí."
    />
    <p v-else-if="error" class="text-center text-primary">{{ error }}</p>
    <div v-else class="flex flex-col gap-4">
      <PokemonCard
        v-for="p in pokemons"
        :key="p.id"
        :pokemon="p"
        :is-favorite="true"
        @toggle-favorite="favoritesStore.toggleFavorite(p.name)"
      />
    </div>
  </main>
</template>
