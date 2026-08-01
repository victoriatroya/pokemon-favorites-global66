<script setup lang="ts">
const model = defineModel<string>({ default: '' })
</script>

<template>
  <div class="flex items-center gap-3">
    <label class="flex flex-1 items-center gap-2 rounded-full bg-white px-4 py-3 shadow-sm">
      <svg
        class="h-5 w-5 text-neutral-mid"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        v-model="model"
        type="search"
        placeholder="Buscar Pokémon..."
        class="w-full bg-transparent outline-none placeholder:text-neutral-mid"
      />
    </label>
    <button
      type="button"
      class="grid h-12 w-12 place-items-center rounded-full bg-white shadow-sm"
      aria-label="Buscar"
    >
      <svg
        class="h-5 w-5 text-neutral-mid"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    </button>
  </div>
</template>
