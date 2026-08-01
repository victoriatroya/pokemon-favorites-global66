<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { usePokemonList } from '@/composables/usePokemonList'
import LoadingPokeball from '@/components/ui/LoadingPokeball.vue'
import { useFavoritesStore } from '@/stores/favorite'
import SearchInput from '@/components/ui/SearchInput.vue'
import PokemonCard from '@/components/pokemon/PokemonCard.vue'
import { ref } from 'vue'
const favorites = useFavoritesStore()
const search = ref('')

const { pokemons, isLoading, error, loadMore } = usePokemonList()

const isInitialLoading = computed(() => isLoading.value && pokemons.value.length === 0)

onMounted(loadMore)
</script>

<template>
  <div v-if="isInitialLoading" class="">
    <LoadingPokeball />
  </div>

  <main v-else class="min-h-screen w-full max-w-2xl mx-auto px-4 py-6 bg-neutral-light">
    <SearchInput v-model="search" class="mb-6" />
    <p v-if="error" class="text-center text-primary">{{ error }}</p>
    <div v-else class="flex flex-col gap-4">
      <PokemonCard
        v-for="p in pokemons"
        :key="p.id"
        :pokemon="p"
        :is-favorite="favorites.isFavorite(p.name)"
        @toggle-favorite="favorites.toggleFavorite(p.name)"
      />
    </div>
  </main>
</template>
