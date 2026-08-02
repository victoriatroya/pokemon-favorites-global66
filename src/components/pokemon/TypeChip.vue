<script setup lang="ts">
import { computed } from 'vue'
import { TYPE_STYLES, DEFAULT_TYPE_STYLE } from '@/utils/pokemonTypes'
import TypeIcon from '@/components/ui/TypeIcon.vue'

const props = defineProps<{
  type: string
}>()

const style = computed(() => TYPE_STYLES[props.type] ?? DEFAULT_TYPE_STYLE)
</script>

<template>
  <span
    class="flex items-center gap-1.5 rounded-full py-1 pl-1 pr-3 text-xs font-semibold text-white"
    :class="style.chip"
  >
    <span class="grid h-5 w-5 place-items-center rounded-full bg-white">
      <TypeIcon class="h-3 w-3" :type="type" :color-class="style.chip" />
    </span>
    {{ style.label }}
  </span>
</template>
