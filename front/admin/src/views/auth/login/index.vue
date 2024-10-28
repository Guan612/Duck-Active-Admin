<script setup lang="ts">
import { ref } from 'vue';

const loginInfo = ref({
    loginId: '',
    password: ''
})
const snackbarText = ref('')
const snackbar = ref(false)
const timeout = 1000
const onFinish = () => {
    console.log(loginInfo.value);
}
</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <div
            class="flex flex-row w-1/2 p-2 bg-gradient-to-r from-transblue via-white to-transpink items-center rounded-3xl shadow-lg">
            <div class="w-1/2 justify-center items-center">
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
    </div>
</template>