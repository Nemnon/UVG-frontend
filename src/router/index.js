import Vue from 'vue'
import VueRouter from 'vue-router'
import Events from '@/views/Events.vue'
import Users from '@/views/Users.vue'
import Login from '@/views/Login.vue'
import RouteGuard from '@/router/routeGuard'
import Logs from '@/views/Logs'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'events',
    component: Events,
    beforeEnter: RouteGuard
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
    beforeEnter: RouteGuard
  },
  {
    path: '/logs',
    name: 'logs',
    component: Logs,
    beforeEnter: RouteGuard
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
