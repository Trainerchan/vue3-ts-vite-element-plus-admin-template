<template>
  <el-container class="index-layout" :direction="`horizontal`">
    <BaseAside></BaseAside>
    <el-container :direction="`vertical`">
      <BaseHeader></BaseHeader>
      <el-main>
        <RouterView v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component"></component>
          </Transition>
        </RouterView>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import BaseAside from '@/components/base/BaseAside.vue'
import BaseHeader from '@/components/base/BaseHeader.vue'
import { useCommonStore } from '@/stores/common'
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { menuList } from '@/config/menu.config'
import type { Menu } from '@/types/menu'

const commonStore = useCommonStore()

const route = useRoute()
let asideMenuList: any[] = []
asideMenuList = asideMenuList.concat(...menuList.map((v) => v.children))
watchEffect(() => {
  const pathList: Menu[] = asideMenuList.filter((v) => v.path === route.path)
  if (pathList.length != 0) {
    commonStore.setActiveMenu(pathList[0])
  }
})
</script>

<style lang="scss" scoped>
.index-layout {
  width: 100%;
  height: 100%;
}

.el-main {
  background-color: #f8f8f8;

  &>div {
    width: 100%;
    min-height: 100%;
    background-color: #fff;
    border-radius: 2px;
  }
}


.fade-enter-active,
.fade-leave-active {
  transition: all 200ms;
}


.fade-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.fade-enter-to {
  opacity: 1;
  transform: translateX(0px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
