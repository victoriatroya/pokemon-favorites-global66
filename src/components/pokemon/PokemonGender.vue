<script setup lang="ts">
import { computed } from 'vue'
import { getGenderRatio, formatPercent } from '@/utils/genderRatio'

const props = defineProps<{
  genderRate: number
}>()

const ratio = computed(() => getGenderRatio(props.genderRate))
</script>

<template>
  <section v-if="ratio" class="mt-6">
    <h2 class="text-center text-xs font-semibold uppercase tracking-wide text-neutral-mid">
      Género
    </h2>
    <div class="mt-2 flex h-2 overflow-hidden rounded-full bg-neutral-200">
      <div class="bg-blue-500" :style="{ width: ratio.male + '%' }" />
      <div class="bg-pink-400" :style="{ width: ratio.female + '%' }" />
    </div>
    <div class="mt-1.5 flex justify-between text-xs font-semibold text-neutral-mid">
      <span>♂ {{ formatPercent(ratio.male) }}</span>
      <span>♀ {{ formatPercent(ratio.female) }}</span>
    </div>
  </section>
  <p v-else class="mt-6 text-center text-xs font-semibold uppercase tracking-wide text-neutral-mid">
    Sin género
  </p>
</template>
