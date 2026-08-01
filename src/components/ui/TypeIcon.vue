<script setup lang="ts">
import { computed } from 'vue'
import { typeIconUrl } from '@/utils/pokemonTypes'

const props = defineProps<{
  type: string
  colorClass?: string
}>()

const maskStyle = computed(() => {
  const url = `url("${typeIconUrl(props.type)}")`
  return {
    maskImage: url,
    maskSize: 'contain',
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskImage: url,
    WebkitMaskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
  }
})
</script>

<template>
  <span class="inline-block" :class="colorClass ?? 'bg-neutral-dark'" :style="maskStyle" />
</template>
