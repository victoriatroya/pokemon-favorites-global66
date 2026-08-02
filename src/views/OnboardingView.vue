<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import slide1 from '@/assets/images/people.svg'
import slide2 from '@/assets/images/lady.svg'

const ONBOARDING_KEY = 'onboarding-seen'

const router = useRouter()
const step = ref(0)

const slides = [
  {
    image: slide1,
    title: 'Todos los Pokémon en un solo lugar',
    description:
      'Accede a una amplia lista de Pokémon de todas las generaciones creadas por Nintendo',
    cta: 'Continuar',
  },
  {
    image: slide2,
    title: 'Mantén tu Pokédex actualizada',
    description:
      'Guarda tu perfil, Pokémon favoritos, configuraciones y mucho más en la aplicación',
    cta: 'Empecemos',
  },
]

const currentSlide = computed(() => {
  return slides[step.value] ?? slides[0]!
})

function next() {
  if (step.value < slides.length - 1) {
    step.value++
    return
  }
  try {
    localStorage.setItem(ONBOARDING_KEY, 'true')
  } catch {}
  router.push({ name: 'home' })
}
</script>

<template>
  <main class="flex min-h-screen items-center justify-center bg-neutral-light p-4">
    <div
      class="flex w-full max-w-sm flex-col items-center gap-4 rounded-3xl bg-white px-8 py-12 text-center shadow-sm"
    >
      <img :src="currentSlide.image" alt="" class="h-56 object-contain" />

      <h1 class="text-2xl font-semibold text-neutral-dark">{{ currentSlide.title }}</h1>
      <p class="text-sm text-neutral-mid">{{ currentSlide.description }}</p>

      <div class="mt-2 flex gap-2" aria-hidden="true">
        <span
          v-for="(s, i) in slides"
          :key="i"
          class="h-2 rounded-full transition-all"
          :class="i === step ? 'w-6 bg-blue' : 'w-2 bg-neutral-300'"
        />
      </div>

      <button
        type="button"
        class="cursor-pointer mt-4 w-full rounded-full bg-blue px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-blue-dark"
        @click="next"
      >
        {{ currentSlide.cta }}
      </button>
    </div>
  </main>
</template>
