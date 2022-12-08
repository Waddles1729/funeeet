import { createRouter, createWebHistory } from 'vue-router'
import ClassroomView from '../views/ClassroomView.vue'

const routes = [
  {
    path: '/',
    name: 'classroom',
    component: ClassroomView 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
