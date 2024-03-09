import type { Menu } from "@/types/menu";

export const menuList: Menu[] = [
  // 账号管理
  {
    index: '1',
    icon: 'mj-zhanghaoguanli',
    text: '账号管理',
    name: 'account',
    path: '/account',
    children: [
      {
        index: '1-1',
        text: '查看账号',
        name: 'accountView',
        path: '/account/view'
      }
    ]
  },
  // 用户管理
  {
    index: '2',
    icon: 'mj-yonghuguanli',
    text: '用户管理',
    name: 'user',
    path: '/user',
    children: [
      {
        index: '2-2',
        text: '查看用户',
        name: 'userView',
        path: '/user/view'
      }
    ]
  }
]