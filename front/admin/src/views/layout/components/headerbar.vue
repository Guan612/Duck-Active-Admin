<script setup lang="ts">
import { DownOutlined, AlignLeftOutlined } from '@ant-design/icons-vue';
import { Button } from 'ant-design-vue';
import { useUserStore } from '@/stores/userstore';
import router from '@/router';
const userstore = useUserStore()

const adminUrl = (role) => {
    if (role == 1) {
        return "/activeadmin/responisble"
    } else if (role == 2 || role == 3) {
        return '/activeadmin/teacher'
    }
}

const  infoUrl = (role)=>{
    if(role==1){
        return '/studeninfo'
    } else if (role==2||role==3){
        return '/teacherinfo'
    }
}
</script>

<template>
    <div
        class="flex flex-row justify-between bg-gradient-to-r from-transblue via-white to-transpink items-center h-1/10">
        <div class="flex items-center">
            <div class="hidden md:flex flex-col justify-center items-center m-2">
                <img src="../../../assets/logo.svg" class="w-8 h-8" alt="">
                <p class="text-white text-md font-bold">鸭鸭活动管理</p>
            </div>
            <div class="md:hidden flex flex-col justify-center items-center m-2">
                <a-dropdown class="flex justify-center items-center">
                    <a-button class="ant-dropdown-link" @click.prevent>
                        <AlignLeftOutlined />
                    </a-button>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item>
                                <a href="javascript:;">1st menu item</a>
                            </a-menu-item>
                            <a-menu-item>
                                <a href="javascript:;">2nd menu item</a>
                            </a-menu-item>
                            <a-menu-item>
                                <a href="javascript:;">3rd menu item</a>
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </div>
            <div class="hidden md:flex items-center m-2">
                <div class="flex m-1">
                    <a :href="infoUrl(userstore.userInfo.role)">信息统计</a>
                </div>
                <a-dropdown class="flex justify-center items-center m-1" :trigger="['click']">
                    <a class="ant-dropdown-link" @click.prevent>
                        用户管理
                        <DownOutlined />
                    </a>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item>
                                <a href="/usercostadmin">用户角色管理</a>
                            </a-menu-item>
                            <a-menu-item>
                                <a href="/userinfoadmin">用户信息管理</a>
                            </a-menu-item>
                            <a-menu-item>
                                <a href="javascript:;">3rd menu item</a>
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
                <a-dropdown class="flex justify-center items-center m-1" :trigger="['click']">
                    <a class="ant-dropdown-link" @click.prevent>
                        活动管理
                        <DownOutlined />
                    </a>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item>
                                <a href="/createactiveadmin">活动发布</a>
                            </a-menu-item>
                            <a-menu-item>
                                <a href="/activereviewadmin">活动审核</a>
                            </a-menu-item>
                            <a-menu-item>
                                <a :href="adminUrl(userstore.userInfo.role)">活动管理</a>
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </div>
        </div>
        <div class="flex items-center mr-2">
            <div class="flex justify-center items-center" v-if="userstore.userInfo">
                <div class="text-white font-bold text-xl m-2">
                    <a-popover placement="bottomRight">
                        <template #content>
                            <div class="flex flex-col justify-center items-center">
                                <Button class="m-2">个人中心</Button>
                                <Button @click="userstore.logOut">退出登录</Button>
                            </div>
                        </template>
                        <div class="flex flex-row items-center">
                            <div class="mx-2">{{ userstore.userInfo.nickname || userstore.userInfo.loginId }}</div>
                            <a-avatar size="large" :src="userstore.userInfo.headerimg || ''"></a-avatar>
                        </div>
                    </a-popover>
                </div>
            </div>
            <div class="flex" v-else>
                <Button @click="$router.push('/auth/login')">去登录</Button>
            </div>
            <div>

            </div>
        </div>
    </div>
</template>