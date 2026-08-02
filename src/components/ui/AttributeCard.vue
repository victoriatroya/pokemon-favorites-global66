<script setup lang="ts">
defineProps<{
  label: string
  value: string
  icon?: string
}>()
</script>

<template>
  <div>
    <p
      class="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-color-secondary"
    >
      <img v-if="icon" :src="icon" alt="" class="h-4 w-4" />
      {{ label }}
    </p>
    <p
      class="mt-1.5 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-center text-lg font-semibold text-color-secondary"
    >
      {{ value }}
    </p>
  </div>
</template>
