<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getUserListAPI } from '@/api/user';
import { userRole } from '@/dto/userDto';
import { message } from 'ant-design-vue';

const userList = ref([]);

const getUserList = async () => {
    const res = await getUserListAPI();
    userList.value = res;
};

const handleSetRole = async (userId: number, role: number) => {
    try {
        // 这里替换实际的角色更新API
        // await updateUserRoleAPI(userId, role)
        message.success('角色更新成功');
        getUserList();
    } catch (e) {
        message.error('操作失败');
    }
};

const getUserRole = (role: number) => {
    return userRole[role] || '未知角色';
};

const getRoleColor = (role: number) => {
    const colors = {
        3: 'red',
        2: 'blue',
        1: 'green',
        0: 'gray'
    };
    return colors[role] || 'gray';
};

onMounted(() => {
    getUserList();
});
</script>

<template>
    <div class="flex flex-col p-4 bg-white rounded-lg shadow-sm">
        <h2 class="text-3xl font-semibold text-gray-800 mb-6 text-center">用户角色管理</h2>
        <div class="flex flex-col space-y-4">
            <div v-for="item in userList" :key="item.id"
                class="flex flex-col md:flex-row items-stretch md:items-center p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors border border-gray-200">
                <div class="flex-1 flex flex-col md:flex-row items-start md:items-center gap-4 mb-2 md:mb-0">
                    <div class="text-gray-600">
                        <span class="font-medium">账号:</span>
                        <span class="ml-1 text-gray-800 font-mono">{{ item.loginId }}</span>
                    </div>
                    <div class="text-gray-600">
                        <span class="font-medium">昵称:</span>
                        <span class="ml-1 text-gray-800">{{ item.nickname || '暂无昵称' }}</span>
                    </div>
                    <a-tag :color="getRoleColor(item.role)" class="!text-sm !px-2 !py-1 !rounded-md">
                        {{ getUserRole(item.role) }}
                    </a-tag>
                </div>

                <div class="flex items-center gap-2 md:ml-auto">
                    <a-button type="primary" class="!text-sm !h-8" @click="handleSetRole(item.id, 1)">
                        设为老师
                    </a-button>
                    <a-button type="primary" class="!text-sm !h-8" @click="handleSetRole(item.id, 2)">
                        设为社团负责人
                    </a-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@media (max-width: 768px) {
    .ant-tag {
        @apply !w-full !justify-center;
    }
}
</style>
