import { createRouter, createWebHistory } from 'vue-router'
import InsertionEntity from '@/components/screen/InsertionEntity.vue'
import InsertionUser from '@/components/screen/InsertionUser.vue'
import InsertionUserEntity from '@/components/screen/InsertionUserEntity.vue'
import ListeEntity from '@/components/screen/ListeEntity.vue'

import ListeUser from '@/components/screen/ListeUser.vue'
import ListeUserEntity from '@/components/screen/ListeUserEntity.vue'
const routes = [
  { path: '/', component: InsertionEntity },
  { path: '/listes', component: ListeEntity },

  { path: '/insert-entity', component: InsertionEntity },
  { path: '/insert-user', component: InsertionUser },
  { path: '/insert-user-entity', component: InsertionUserEntity },

  { path: '/liste-entity', component: ListeEntity },
  { path: '/liste-user', component: ListeUser },
  { path: '/liste-user-entity', component: ListeUserEntity },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router