import { createRouter, createWebHashHistory } from 'vue-router'

// 获取所有vue页面
const pages = import.meta.glob('@/views/**/*.vue', {
  eager: true,
  import: 'default'
})

// 自动生成路由
function generateRoutes() {}

const router = createRouter({
  history: createWebHashHistory(),
  routes: []
})

export default router
