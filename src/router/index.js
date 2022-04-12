import { createRouter, createWebHistory } from 'vue-router'
import ProjectView from '@/views/ProjectView.vue'

const routes = [
  {
    path: '/:id',
    name: 'home',
    component: ProjectView
  },
  {
    path: '/',
    name: 'home',
    component: ProjectView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
