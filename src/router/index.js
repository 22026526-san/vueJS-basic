import { createRouter, createWebHistory } from 'vue-router'

import CandidateTable from '../views/cadidate/CandidateTable.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CandidateTable,
    }
  ]
})

export default router