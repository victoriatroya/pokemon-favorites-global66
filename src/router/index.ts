import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FavoritesView from '@/views/FavoritesView.vue'
import ComingSoonView from '@/views/ComingSoonView.vue'
import PokemonDetailView from '@/views/PokemonDetailView.vue'
import OnboardingView from '@/views/OnboardingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/regiones', name: 'regions', component: ComingSoonView },
    { path: '/favoritos', name: 'favorites', component: FavoritesView },
    { path: '/perfil', name: 'profile', component: ComingSoonView },
    { path: '/pokemon/:name', name: 'pokemon-detail', component: PokemonDetailView, props: true },
    { path: '/bienvenida', name: 'onboarding', component: OnboardingView, meta: { hideNav: true } },
  ],
})

router.beforeEach((to) => {
  const seen = localStorage.getItem('onboarding-seen')
  if (!seen && to.name !== 'onboarding') return { name: 'onboarding' }
  if (seen && to.name === 'onboarding') return { name: 'home' }
})

export default router
