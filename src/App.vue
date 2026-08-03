<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import NavBar from '@/components/ui/NavBar.vue'

const route = useRoute()
</script>

<template>
  <div class="min-h-screen bg-neutral-light pb-16 md:pb-0">
    <NavBar v-if="!route.meta.hideNav" />
    <RouterView />
  </div>
</template>
