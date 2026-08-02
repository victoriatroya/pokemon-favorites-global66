<script setup lang="ts">
import TypeChip from './TypeChip.vue'

defineProps<{
  weaknesses: string[]
}>()
</script>

<template>
  <section v-if="weaknesses.length" class="mt-6">
    <h2 class="text-lg font-semibold uppercase tracking-wide text-principal">Debilidades</h2>
    <ul class="mt-2 flex flex-wrap gap-2">
      <li v-for="w in weaknesses" :key="w">
        <TypeChip :type="w" />
      </li>
    </ul>
  </section>
</template>
