<script setup lang="ts">
import search from '@/assets/icons/search.svg'

const model = defineModel<string>({ default: '' })
const emit = defineEmits<{ (e: 'submit'): void }>()
</script>

<template>
  <div class="flex items-center gap-3">
    <label class="flex flex-1 items-center gap-2 rounded-full bg-white px-4 py-3 shadow-sm">
      <img :src="search" alt="" />
      <input
        v-model="model"
        type="search"
        placeholder="Buscar Pokémon..."
        class="w-full bg-transparent outline-none placeholder:text-neutral-mid"
        @keydown.enter="emit('submit')"
      />
    </label>

    <button
      type="button"
      class="grid h-12 w-12 place-items-center rounded-full bg-white shadow-sm cursor-pointer"
      aria-label="Buscar"
      @click="emit('submit')"
    >
      <img :src="search" alt="" />
    </button>
  </div>
</template>
