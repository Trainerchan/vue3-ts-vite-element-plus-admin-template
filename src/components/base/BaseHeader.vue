<template>
  <el-header>
    <div class="header-left">
      <div class="header-left__control" @click="handleCollapse">
        <i class="iconfont" :class="[commonStore.compMenuCollapse ? 'mj-menu-expand' : 'mj-menu-collapse']"></i>
      </div>
      <div class="header-left__active">{{ commonStore.compActiveMenuText }}</div>
    </div>
    <div class="header-right">
      <el-dropdown placement="bottom-end" @command="handleCommand">
        <span class="el-dropdown-link">
          <!-- <el-avatar :src="userStore.compUserInfo.image" alt="管理员"></el-avatar> -->
          <el-avatar :src="AdminAvatar" alt="管理员"></el-avatar>
          <!-- <span class="username">{{ userStore.compUserInfo.user_name }}</span> -->
          <span class="username">测试的名字</span>
          <span>
            <i class="iconfont mj-xiala"></i>
          </span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup lang="ts">
// 管理员投降测试
import AdminAvatar from '@/assets/images/user.jpeg'
import { useRouter } from 'vue-router'
import { TOKEN_KEY } from '@/config/base.config'
import { useCommonStore } from '@/stores/common'
import { Session } from '@/utils/storage'
// import { useUserStore } from '@/stores/user'

// const userStore = useUserStore()
const commonStore = useCommonStore()
const router = useRouter()
const handleCollapse = () => {
  const isCollapse = commonStore.compMenuCollapse
  commonStore.setMenuState(!isCollapse)
}

const handleCommand = (command: string) => {
  if (command === 'logout') {
    Session.remove(TOKEN_KEY)
    router.replace({ name: 'login' })
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  font-size: 16px;
}

.header-left {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.header-left__control {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  cursor: pointer;

  i {
    font-size: 24px;
  }

  &:hover {
    opacity: 0.4;
  }
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  height: 100%;
  border: none;
  cursor: pointer;

  &:focus-visible {
    outline: none;
  }

  .username {
    max-width: 90px;
    padding: 0 10px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
