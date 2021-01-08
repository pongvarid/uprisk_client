import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import {AppRouter} from './app'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/guest/Login.vue')
  },
  {
    path: '/login',
    name: 'login', 
    component: () => import(/* webpackChunkName: "about" */ '../views/guest/Login.vue')
  },
  {
    path: '/about',
    name: 'About', 
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/app/',
    name: 'App',
    component: () => import('../views/app/Base.vue'),
    children: AppRouter
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
