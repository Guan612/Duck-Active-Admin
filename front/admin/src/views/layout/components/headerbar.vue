<script setup lang="ts">
import { Button } from 'ant-design-vue';
import { useUserStore } from '@/stores/userstore';
import router from '@/router';
const userstore = useUserStore()
</script>

<template>
    <a-layout-header class="flex flex-row bg-gradient-to-r from-transblue via-white to-transpink items-center h-1/10">
        <div class="font-bold text-2xl p-2">123</div>
        <div>
            <div class="flex justify-center items-center" v-if="userstore.userInfo">
                <div class="text-white font-bold text-xl m-2">
                    <a-popover>
                        <template #content>
                            <div class="flex flex-col justify-center items-center">
                                <Button class="m-2">个人中心</Button>
                                <Button @click="userstore.logOut">退出登录</Button>
                            </div>
                        </template>
                        <div type="primary">{{ userstore.userInfo.nickname || userstore.userInfo.loginId }}</div>
                    </a-popover>
                </div>
            </div>
            <div class="flex" v-else>
                <Button @click="$router.push('/auth/login')">去登录</Button>
            </div>
        </div>
    </a-layout-header>
</template>