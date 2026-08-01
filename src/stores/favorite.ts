import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'pokemon-favorites'

function loadInitialFavorites(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<string[]>(loadInitialFavorites())

  watch(
    favorites,
    (value) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
      } catch {}
    },
    { deep: true },
  )

  const isFavorite = computed(() => (name: string) => favorites.value.includes(name))
  const count = computed(() => favorites.value.length)

  function toggleFavorite(name: string) {
    if (favorites.value.includes(name)) {
      favorites.value = favorites.value.filter((n) => n !== name)
    } else {
      favorites.value.push(name)
    }
  }

  return { favorites, isFavorite, count, toggleFavorite }
})
