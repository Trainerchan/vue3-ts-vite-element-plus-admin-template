import { menuList } from '@/config/menu.config'
import type { Menu } from '@/types/menu'
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import IndexView from '@/views/IndexView.vue'
import LoginView from '@/views/LoginView.vue'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const pages = import.meta.glob('@/views/**/*.vue', {
  eager: true,
  import: 'default'
})

function generateRoutes(menuDataList: Menu[]): RouteRecordRaw[] {
  function toTitle(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  let childRoutes: any[] = []
  childRoutes = childRoutes.concat(...menuDataList.map((v) => v.children))
  return childRoutes.map((v: Menu) => {
    const m = v.path?.split('/') as string[]
    const importPath = '/src/views/' + m[1] + '/' + toTitle(m[1]) + toTitle(m[2]) + '.vue'
    return {
      path: v.path,
      name: v.name,
      component: pages[importPath],
      meta: {
        title: v.text
      }
    }
  }) as RouteRecordRaw[]
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: { name: 'index' }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/index',
      name: 'index',
      component: IndexView,
      children: generateRoutes(menuList)
    }
  ]
})
router.beforeEach((to, _from, next) => {
  document.title = import.meta.env.VITE_APP_TITLE + ' - ' + to.meta.title
  Nprogress.start()
  next()
})


router.afterEach(() => {
  Nprogress.done()
})

export default router
