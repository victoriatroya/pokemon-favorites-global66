import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FavoritesView from '@/views/FavoritesView.vue'
import ComingSoonView from '@/views/ComingSoonView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/regiones', name: 'regions', component: ComingSoonView },
    { path: '/favoritos', name: 'favorites', component: FavoritesView },
    { path: '/perfil', name: 'profile', component: ComingSoonView },
  ],
})

export default router
