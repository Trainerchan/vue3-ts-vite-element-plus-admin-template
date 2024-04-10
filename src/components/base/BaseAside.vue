<template>
  <el-aside :width="commonStore.compMenuCollapse ? '64px' : '200px'">
    <el-scrollbar>
      <RouterLink :to="{ name: 'accountView' }" class="logo-container">
        <span class="logo-container__logo">
          <BaseLogo></BaseLogo>
        </span>
        <span class="logo-container__title">管理后台</span>
      </RouterLink>
      <el-menu router :default-active="commonStore.compActiveMenuIndex" :collapse="commonStore.compMenuCollapse"
        background-color="transparent" text-color="rgb(234, 234, 234)">
        <el-sub-menu :index="subMenu.index" v-for="(subMenu, idx1) in compMenuList" :key="subMenu.name">
          <template #title>
            <i class="iconfont" :class="[subMenu.icon]" style="font-size: 22px;"></i>
            <span style="padding-left: 10px">{{ subMenu.text }}</span>
          </template>
          <el-menu-item :index="menuItem.index" v-for="(menuItem, idx2) in subMenu.children"
            :key="menuItem.name" :route="{ name: menuItem.name }">
            {{ menuItem.text }}
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup lang="ts">
import BaseLogo from './BaseLogo.vue'
import { useCommonStore } from '@/stores/common'
import { menuList, noMenuList } from '@/config/menu.config'
import { computed } from 'vue'
import type { Menu } from '@/types/menu'

const commonStore = useCommonStore()
const compMenuList = computed(() => {
  let newMenuList: Menu[] = []
  noMenuList.forEach((noMenu) => {
    newMenuList = menuList.filter((v1) => {
      v1.children = v1.children?.filter((v2) => {
        return v2.index !== noMenu.index
      })
      return v1.index !== noMenu.index
    })
  })
  return newMenuList
})
</script>

<style lang="scss" scoped>
.el-aside {
  background-color: #354e67;
  transition: width 0.3s;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
  font-size: 20px;
  color: rgb(234, 234, 234);
}

.logo-container__logo {
  svg {
    width: 65px;
    height: 65px;
  }
}

.logo-container__title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
