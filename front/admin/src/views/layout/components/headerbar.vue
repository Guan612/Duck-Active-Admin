<script setup lang="ts">
import {
  DownOutlined,
  AlignLeftOutlined,
  UserOutlined,
  ProfileOutlined,
  PlusCircleOutlined,
  AppstoreOutlined,
  LogoutOutlined
} from '@ant-design/icons-vue';
import { useUserStore } from '@/stores/userstore';
import router from '@/router';
const userstore = useUserStore();

const adminUrl = (role: number) => {
  if (role === 1) return "/activeadmin/responisble";
  if (role === 2 || role === 3) return '/activeadmin/teacher';
};
const infoUrl = (role: number) => {
  if (role === 1) return '/studeninfo';
  if (role === 2 || role === 3) return '/teacherinfo';
};
const pointUrl = (role: number) => {
  if (role === 1) return "/responsintegral";
  if (role === 2 || role === 3) return '/teacherintegral';
};
</script>

<template>
  <div class="h-16 bg-white shadow-sm flex items-center justify-between px-4 lg:px-6">
    <!-- 左侧导航 -->
    <div class="flex items-center gap-6">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2">
        <img src="../../../assets/logo.svg" class="w-8 h-8" alt="Logo">
        <span class="hidden md:block text-blue-600 font-bold text-xl">鸭鸭活动管理</span>
      </router-link>

      <!-- 桌面导航 -->
      <div class="hidden md:flex items-center gap-4 ml-6">
        <!-- 信息统计 -->
        <a-dropdown :trigger="['hover']" overlay-class-name="header-dropdown">
          <router-link
            :to="infoUrl(userstore.userInfo?.role)"
            class="nav-link text-gray-600 hover:text-blue-600 transition-colors"
          >
            信息统计
          </router-link>
                </a-dropdown>

        <!-- 用户管理 -->
        <a-dropdown :trigger="['hover']">
          <span class="nav-dropdown-trigger">
            用户管理 <DownOutlined class="text-xs ml-1" />
          </span>
                    <template #overlay>
                        <a-menu>
              <a-menu-item key="1">
                <router-link to="/usercostadmin" class="flex items-center gap-2">
                  <UserOutlined /> 用户角色管理
                </router-link>
              </a-menu-item>
              <a-menu-item key="2">
                <router-link to="/userinfoadmin" class="flex items-center gap-2">
                  <ProfileOutlined /> 用户信息管理
                </router-link>
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>

        <!-- 活动管理 -->
        <a-dropdown :trigger="['hover']">
          <span class="nav-dropdown-trigger">
            活动管理 <DownOutlined class="text-xs ml-1" />
          </span>
                    <template #overlay>
                        <a-menu>
              <a-menu-item key="1">
                <router-link to="/createactiveadmin" class="flex items-center gap-2">
                  <PlusCircleOutlined /> 活动发布
                </router-link>
              </a-menu-item>
              <a-menu-item key="2">
                <router-link :to="adminUrl(userstore.userInfo.role)" class="flex items-center gap-2">
                  <AppstoreOutlined /> 活动管理
                </router-link>
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>

        <!-- 积分管理 -->
        <router-link
          :to="pointUrl(userstore.userInfo.role)"
          class="nav-link text-gray-600 hover:text-blue-600 transition-colors"
        >
          积分管理
        </router-link>
                            </div>
                        </div>

    <!-- 移动端菜单 -->
    <div class="md:hidden">
      <a-dropdown :trigger="['click']" overlay-class-name="mobile-menu-dropdown">
        <AlignLeftOutlined class="text-xl text-gray-600" />
        <template #overlay>
          <a-menu class="!min-w-[200px]">
            <!-- 移动端导航项 -->
            <a-menu-item key="1">
              <router-link :to="infoUrl(userstore.userInfo.role)">信息统计</router-link>
            </a-menu-item>
            <a-sub-menu key="user-management" title="用户管理">
              <a-menu-item key="2-1">
                <router-link to="/usercostadmin">角色管理</router-link>
              </a-menu-item>
              <a-menu-item key="2-2">
                <router-link to="/userinfoadmin">信息管理</router-link>
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="active-management" title="活动管理">
              <a-menu-item key="3-1">
                <router-link to="/createactiveadmin">活动发布</router-link>
              </a-menu-item>
              <a-menu-item key="3-2">
                <router-link :to="adminUrl(userstore.userInfo.role)">活动管理</router-link>
              </a-menu-item>
            </a-sub-menu>
            <a-menu-item key="4">
              <router-link :to="pointUrl(userstore.userInfo.role)">积分管理</router-link>
            </a-menu-item>
          </a-menu>
</template>
      </a-dropdown>
    </div>

    <!-- 用户操作 -->
    <div class="flex items-center gap-4">
      <a-dropdown :trigger="['hover']" placement="bottomRight">
        <div class="flex items-center gap-2 cursor-pointer" v-if="userstore.userInfo">
          <a-avatar
            :src="userstore.userInfo.headerimg"
            size="default"
            class="!bg-blue-100 !text-blue-600"
          >
            {{ userstore.userInfo.nickname?.[0] || userstore.userInfo.loginId?.[0] }}
          </a-avatar>
          <span class="text-gray-600 hidden md:block">
            {{ userstore.userInfo.nickname || userstore.userInfo.loginId }}
          </span>
          <DownOutlined class="text-xs text-gray-400" />
        </div>
        <template #overlay>
          <a-menu class="!min-w-[160px]">
            <a-menu-item key="profile">
              <router-link to="/studeninfo" class="flex items-center gap-2">
                <UserOutlined /> 个人中心
              </router-link>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="logout" @click="userstore.logOut">
              <span class="text-red-500 flex items-center gap-2">
                <LogoutOutlined /> 退出登录
              </span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>

      <!-- 未登录状态
      <div v-else class="flex items-center">
        <a-button @click="$router.push('/auth/login')" type="primary" class="login-button">
          去登录
        </a-button>
      </div> -->
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.nav-link {
  @apply px-3 py-2 text-sm font-medium transition-colors;
}

.nav-dropdown-trigger {
  @apply px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 cursor-pointer flex items-center;
}

:deep(.header-dropdown) .ant-dropdown-menu {
  @apply !min-w-[180px] !py-2;
}

:deep(.mobile-menu-dropdown) .ant-dropdown-menu {
  @apply !p-2;
}

.login-button {
  @apply bg-blue-600 hover:bg-blue-700 transition-colors;
}
</style>
