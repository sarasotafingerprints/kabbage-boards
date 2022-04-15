import { createRouter, createWebHistory } from 'vue-router'
import ProjectView from '@/views/ProjectView.vue'

const routes = [
  {
    path: '/:id',
    name: 'project',
    component: ProjectView
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
