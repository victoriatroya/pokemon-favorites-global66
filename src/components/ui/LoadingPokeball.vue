<script setup lang="ts">
import loader from '@/assets/images/loader.svg'

defineProps<{
  sizeClass?: string
}>()
</script>

<template>
  <div class="flex items-center justify-center" role="status" aria-label="Loading">
    <img :src="loader" alt="" class="pokeball" :class="sizeClass ?? 'h-[106px] w-[106px]'" />
  </div>
</template>

<style scoped>
.pokeball {
  transform-origin: 50% 100%;
  animation: pokeball-shake 1.4s ease-in-out infinite;
}

@keyframes pokeball-shake {
  0%,
  55%,
  100% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(-14deg);
  }
  20% {
    transform: rotate(12deg);
  }
  30% {
    transform: rotate(-8deg);
  }
  40% {
    transform: rotate(6deg);
  }
}
</style>
