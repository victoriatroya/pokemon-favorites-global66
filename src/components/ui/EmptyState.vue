<script setup lang="ts">
defineProps<{
  image: string
  title: string
  description?: string
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-3 px-8 py-16 text-center min-h-screen">
    <img :src="image" alt="" class="h-40 w-40 object-contain" />
    <h2 class="text-xl font-bold text-neutral-dark">{{ title }}</h2>
    <p v-if="description" class="text-sm text-neutral-mid">{{ description }}</p>
    <div v-if="$slots.action" class="mt-3">
      <slot name="action" />
    </div>
  </div>
</template>
