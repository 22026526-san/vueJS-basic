import { createRouter, createWebHistory } from 'vue-router'

import Candidate from '../views/cadidate/Candidate.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Candidate,
    }
  ]
})

export default router