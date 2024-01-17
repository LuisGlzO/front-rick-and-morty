import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Grid from '../views/Grid.vue'
import AllCharacters from '../views/ListAllCharacters.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/characters/:id',
      name: 'characters',
      component: Grid
    },
    {
      path: '/saved-characters/',
      name: 'saved-characters',
      component: AllCharacters
    }
  ]
})

export default router
