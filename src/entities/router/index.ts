import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    meta: { auth: true, layout: "main" },
    component: () => import(/* webpackChunkName: "about" */ '@/views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { auth: false, layout: "auth" },
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const valid = await fetch(`http://api.equipment.local/authorization/state`, { method: "GET", credentials: "include" })
  if (to.meta.auth && valid.status !== 200) next({ name: 'Login' })
  else if (valid.status == 200 && to.name === "Login") next({ name: "Home" })
  else next()
})