<script setup lang="ts">
import { ref } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useUserStore } from '@/stores/userstore';
import type { loginDto } from '@/dto/userDto';
const userstore = useUserStore();

const loginInfo = ref({
    loginId: '',
    password: ''
});
const onFinish = (loginInfo: loginDto) => {
    userstore.getUserInfo(loginInfo);
};
</script>

<template>
    <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div class="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
            <div class="flex flex-col md:flex-row">
                <!-- 左侧品牌区 -->
                <div
                    class="md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 flex flex-col justify-center items-center text-white">
                    <img src="@/assets/logo.svg" class="w-20 h-20 mb-4" alt="logo">
                    <h1 class="text-3xl font-bold mb-2">鸭鸭活动管理</h1>
                    <p class="text-sm opacity-90">专业的学生活动管理系统</p>
                </div>

                <!-- 右侧表单区 -->
                <div class="md:w-1/2 p-8">
                    <div class="text-center mb-8">
                        <h2 class="text-2xl font-bold text-gray-800 mb-2">欢迎回来</h2>
                        <p class="text-gray-500">请输入账号登录系统</p>
                    </div>

                    <a-form layout="vertical" :model="loginInfo" class="login-form" @finish="onFinish">
                        <a-form-item label="账号" name="loginId" :rules="[{ required: true, message: '请输入登录账号' }]">
                            <a-input v-model:value="loginInfo.loginId" placeholder="请输入账号" class="!h-12 !rounded-lg">
                                <template #prefix>
                                    <UserOutlined class="text-gray-400" />
                                </template>
                            </a-input>
                        </a-form-item>

                        <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码' }]">
                            <a-input-password v-model:value="loginInfo.password" placeholder="请输入密码"
                                class="!h-12 !rounded-lg">
                                <template #prefix>
                                    <LockOutlined class="text-gray-400" />
                                </template>
                            </a-input-password>
                        </a-form-item>

                        <a-form-item class="!mb-0">
                            <a-button type="primary" html-type="submit" block class="!h-12 !rounded-lg !text-base">
                                立即登录
                            </a-button>
                        </a-form-item>
                    </a-form>

                    <div class="mt-6 text-center text-sm">
                        还没有账号？
                        <router-link to="/auth/register" class="text-blue-600 hover:text-blue-700 font-medium">
                            立即注册
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@reference "tailwindcss";

.login-form :deep(.ant-input-affix-wrapper) {
    @apply !pl-3;
}

.login-form :deep(.ant-input-prefix) {
    @apply mr-3;
}
</style>
