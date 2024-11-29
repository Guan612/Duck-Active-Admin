<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/userstore';
import type { loginDto } from '@/dto/userDto';
const userstore = useUserStore()

const loginInfo = ref({
    loginId: '',
    password: ''
})

const onFinish = (loginInfo: loginDto) => {
    userstore.getUserInfo(loginInfo)
}
</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <div
            class="flex flex-col bg-gradient-to-r from-transblue via-white to-transpink items-center rounded-3xl shadow-lg">
            <div class="flex flex-row p-2 ">
                <div class="flex w-1/2 justify-center items-center">
                    <div class="font-bold text-2xl text-center">鸭鸭活动管理</div>
                </div>
                <div class="w-1/2 flex flex-col justify-center m-4 p-4">
                    <a-form layout="vertical" :model="loginInfo" name="basic" autocomplete="off" @finish="onFinish">
                        <a-form-item label="用户id" name="loginId" :rules="[{ required: true, message: '请输入用户登录id' }]">
                            <a-input v-model:value="loginInfo.loginId" />
                        </a-form-item>

                        <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码' }]">
                            <a-input-password v-model:value="loginInfo.password" />
                        </a-form-item>

                        <a-form-item class="flex justify-center">
                            <a-button type="primary" html-type="submit">登录</a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </div>
            <div class="m-2 font-bold">还未注册?<a class="text-blue-300" href="/auth/register">点击注册</a></div>
        </div>
    </div>
</template>