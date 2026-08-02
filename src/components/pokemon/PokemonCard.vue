<script setup lang="ts">
import { computed } from 'vue'
import type { PokemonDetail } from '@/types/pokemon'
import { TYPE_STYLES, DEFAULT_TYPE_STYLE } from '@/utils/pokemonTypes'
import TypeIcon from '@/components/ui/TypeIcon.vue'

import favOutlineIcon from '@/assets/icons/fav.svg'
import favSolidIcon from '@/assets/icons/fav-solid.svg'
import trash from '@/assets/icons/trash.svg'

const props = defineProps<{
  pokemon: PokemonDetail
  isFavorite: boolean
  removable?: boolean
}>()

const emit = defineEmits<{
  (e: 'select'): void
  (e: 'toggle-favorite'): void
  (e: 'remove'): void
}>()

const mainType = computed(() => {
  const firstType = props.pokemon.types[0]?.type.name
  return firstType ? (TYPE_STYLES[firstType] ?? DEFAULT_TYPE_STYLE) : DEFAULT_TYPE_STYLE
})
const number = computed(() => `N°${String(props.pokemon.id).padStart(3, '0')}`)
const artwork = computed(() => props.pokemon.sprites.other['official-artwork'].front_default)
</script>

<template>
  <article
    class="group flex cursor-pointer overflow-hidden rounded-3xl text-black shadow-md transition-transform hover:scale-[1.01]"
    :class="mainType.card"
    @click="emit('select')"
  >
    <div class="flex flex-1 flex-col gap-1 p-4">
      <span class="text-xs text-secondary font-semibold opacity-90">{{ number }}</span>
      <h2 class="text-xl font-bold capitalize">{{ pokemon.name }}</h2>
      <ul class="mt-1 flex gap-2">
        <li
          v-for="t in pokemon.types"
          :key="t.type.name"
          class="flex items-center justify-between gap-2 rounded-full px-2.5 py-1.5 text-xs text-white"
          :class="(TYPE_STYLES[t.type.name] ?? DEFAULT_TYPE_STYLE).chip"
        >
          <span class="grid h-5 w-5 place-items-center rounded-full bg-white">
            <TypeIcon
              class="h-3.5 w-3.5"
              :type="t.type.name"
              :color-class="(TYPE_STYLES[t.type.name] ?? DEFAULT_TYPE_STYLE).chip"
            />
          </span>
          {{ (TYPE_STYLES[t.type.name] ?? DEFAULT_TYPE_STYLE).label }}
        </li>
      </ul>
    </div>

    <div
      class="relative flex w-36 items-center justify-center overflow-hidden rounded-l-2xl"
      :class="mainType.imagePanel"
    >
      <TypeIcon
        :type="pokemon.types[0]?.type.name ?? ''"
        color-class="bg-white/35"
        class="absolute h-26 w-26"
        aria-hidden="true"
      />
      <img
        :src="artwork"
        :alt="pokemon.name"
        class="relative h-16 w-16 object-contain"
        loading="lazy"
      />
      <button
        type="button"
        class="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white shadow cursor-pointer"
        :aria-label="isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'"
        @click.stop="emit('toggle-favorite')"
      >
        <img :src="isFavorite ? favSolidIcon : favOutlineIcon" alt="Heart" class="h-9 w-9" />
      </button>
    </div>
    <button
      v-if="removable"
      type="button"
      class="flex w-16 items-center justify-center bg-red-600 text-white transition-opacity cursor-pointer"
      aria-label="Eliminar de favoritos"
      @click.stop="emit('remove')"
    >
      <img :src="trash" alt="" class="h-8 w-8" />
    </button>
  </article>
</template>
