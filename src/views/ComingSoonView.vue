<script setup lang="ts">
import EmptyState from '@/components/ui/EmptyState.vue'

import comingSoon from '@/assets/images/coming-soon.svg'
</script>

<template>
  <EmptyState
    :image="comingSoon"
    title="¡Muy pronto disponible!"
    description="Estamos trabajando para traerte esta sección. Vuelve más adelante para descubrir todas las novedades."
  />
</template>
