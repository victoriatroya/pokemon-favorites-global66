<script setup lang="ts">
import { RouterLink } from 'vue-router'

import home from '@/assets/icons/home.svg'
import network from '@/assets/icons/network.svg'
import fav from '@/assets/icons/fav.svg'
import profile from '@/assets/icons/profile.svg'

interface NavItem {
  label: string
  to: { name: string }
  icon: string
}

const items: NavItem[] = [
  { label: 'Pokedex', to: { name: 'home' }, icon: home },
  {
    label: 'Regiones',
    to: { name: 'regions' },
    icon: network,
  },
  {
    label: 'Favoritos',
    to: { name: 'favorites' },
    icon: fav,
  },
  {
    label: 'Perfil',
    to: { name: 'profile' },
    icon: profile,
  },
]
</script>

<template>
  <nav
    class="fixed inset-x-0 bottom-0 z-10 border-t border-neutral-200 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.06)] md:sticky md:top-0 md:bottom-auto md:border-t-0 md:border-b md:shadow-sm"
    aria-label="Navegación principal"
  >
    <ul
      class="mx-auto flex w-full max-w-2xl items-center justify-around md:justify-center md:gap-12"
    >
      <li v-for="item in items" :key="item.label">
        <RouterLink :to="item.to" custom v-slot="{ navigate, isActive }">
          <button
            type="button"
            class="flex flex-col items-center gap-0.5 px-3 py-2 text-xs font-semibold transition-colors md:flex-row md:gap-2 md:py-4 md:text-sm"
            :class="isActive ? 'text-blue-600' : 'text-neutral-mid hover:text-neutral-dark'"
            @click="navigate"
          >
            <img :src="item.icon" alt="" />
            {{ item.label }}
          </button>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
