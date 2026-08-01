import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<string[]>([])

  const isFavorite = computed(() => (name: string) => favorites.value.includes(name))

  function toggleFavorite(name: string) {
    if (favorites.value.includes(name)) {
      favorites.value = favorites.value.filter((n) => n !== name)
    } else {
      favorites.value.push(name)
    }
  }

  return { favorites, isFavorite, toggleFavorite }
})
