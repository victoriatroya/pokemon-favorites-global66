<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorite'
import { getPokemonDetail } from '@/services/pokemonCache'
import type { PokemonDetail } from '@/types/pokemon'
import PokemonCard from '@/components/pokemon/PokemonCard.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import emptyFavorites from '@/assets/images/empty-state.svg'

const router = useRouter()
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
    <TransitionGroup v-else tag="div" name="card" class="relative grid grid-cols-1 gap-4">
      <PokemonCard
        v-for="p in pokemons"
        :key="p.id"
        :pokemon="p"
        :is-favorite="true"
        removable
        @toggle-favorite="favoritesStore.toggleFavorite(p.name)"
        @remove="favoritesStore.toggleFavorite(p.name)"
        @select="router.push({ name: 'pokemon-detail', params: { name: p.name } })"
      />
    </TransitionGroup>
  </main>
</template>

<style scoped>
.card-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
  position: absolute;
  width: 100%;
}
.card-leave-to {
  opacity: 0;
  transform: translateX(32px);
}
.card-move {
  transition: transform 0.3s ease;
}
</style>
