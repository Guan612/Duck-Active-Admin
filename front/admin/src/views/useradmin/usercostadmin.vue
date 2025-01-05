<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getUserListAPI } from '@/api/user';
import { userRole } from '@/dto/userDto';

const userList = ref([])

const getUserList = async () => {
    const res = await getUserListAPI()
    userList.value = res
}

const getUserRole = (cost: number) => {
    return userRole[cost] || '未知角色'
}

onMounted(() => {
    getUserList()
})
</script>
<template>
    <div class="flex flex-col">
        <div class="text-2xl font-bold text-center m-2">用户角色管理</div>
        <div class="flex flex-col m-2 p-1">
            <div v-for="item in userList" :key="item.id" class="flex flex-row items-center m-1 p-1">
                <div class="mx-1">{{ item.loginId }}</div>
                <div class="mx-1">{{ item.nickname || '暂无昵称' }}</div>
                <div class="mx-1">{{getUserRole(item.role)}}</div>
                <a-button class="mx-1">设置为老师</a-button>
                <a-button>设置为社团</a-button>
            </div>
        </div>
    </div>
</template>
