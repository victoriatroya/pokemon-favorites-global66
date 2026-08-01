<script setup lang="ts">
import { computed } from 'vue'
import type { PokemonDetail } from '@/types/pokemon'
import { TYPE_STYLES, DEFAULT_TYPE_STYLE, typeIconUrl } from '@/utils/pokemonTypes'

const props = defineProps<{
  pokemon: PokemonDetail
  isFavorite: boolean
}>()

const emit = defineEmits<{
  (e: 'select'): void
  (e: 'toggle-favorite'): void
}>()

const mainType = computed(
  () => TYPE_STYLES[props.pokemon.types[0]?.type.name] ?? DEFAULT_TYPE_STYLE,
)
const number = computed(() => `N°${String(props.pokemon.id).padStart(3, '0')}`)
const artwork = computed(() => props.pokemon.sprites.other['official-artwork'].front_default)
</script>

<template>
  <article
    class="flex cursor-pointer overflow-hidden rounded-2xl text-white shadow-md transition-transform hover:scale-[1.01]"
    :class="mainType.card"
    @click="emit('select')"
  >
    <!-- info -->
    <div class="flex flex-1 flex-col gap-1 p-4">
      <span class="text-sm font-semibold opacity-90">{{ number }}</span>
      <h2 class="text-2xl font-bold capitalize">{{ pokemon.name }}</h2>
      <ul class="mt-1 flex gap-2">
        <li
          v-for="t in pokemon.types"
          :key="t.type.name"
          class="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold"
          :class="(TYPE_STYLES[t.type.name] ?? DEFAULT_TYPE_STYLE).chip"
        >
          <span class="grid h-5 w-5 place-items-center rounded-full bg-white">
            <img :src="typeIconUrl(t.type.name)" alt="" class="h-5 w-4" />
          </span>
          {{ (TYPE_STYLES[t.type.name] ?? DEFAULT_TYPE_STYLE).label }}
        </li>
      </ul>
    </div>

    <div class="relative flex w-36 items-center justify-center bg-white/20">
      <img :src="artwork" :alt="pokemon.name" class="h-28 w-28 object-contain" loading="lazy" />
      <button
        type="button"
        class="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-white shadow"
        :aria-label="isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'"
        @click.stop="emit('toggle-favorite')"
      >
        <svg
          class="h-5 w-5"
          :class="isFavorite ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-neutral-mid'"
          viewBox="0 0 24 24"
          stroke-width="2"
          aria-hidden="true"
        >
          <path
            d="M12 21s-7.5-4.7-10-9.3C.5 8 2.6 4.5 6.2 4.5c2.2 0 3.9 1.3 4.8 3 1-1.7 2.6-3 4.8-3 3.6 0 5.7 3.5 4.2 7.2C19.5 16.3 12 21 12 21Z"
          />
        </svg>
      </button>
    </div>
  </article>
</template>
