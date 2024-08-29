import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/sprint',
      name: 'sprint',
      component: () => import('@/pages/SprintPage.vue')
    },
    {
      path: '/audio',
      name: 'audio',
      component: () => import('@/pages/AudioPage.vue')
    }
  ]
})

export default router
