import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/index.vue'
import { generateRoutes } from './utils'

// 动态生成的路由
const dynamicRoutes = generateRoutes()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        ...dynamicRoutes,
        // 404 页面 - 放在最后
        {
          path: ':pathMatch(.*)*',
          redirect: '/404',
        },
      ],
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/exception/404.vue'),
    },
  ],
})

export default router
