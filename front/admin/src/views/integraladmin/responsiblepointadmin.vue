<script setup lang="ts">
import { getActiceByActiveIdAPI, getActiveByCreatUserAPI } from '@/api/active';
import { addpointAPI } from '@/api/integral'
import { ActivitieStatus } from '@/dto/activeDto';
import { onMounted, ref } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

const activeList = ref([]);
const getActiveList = async () => {
    const res = await getActiveByCreatUserAPI()
    activeList.value = res
}

const addPotin = async (activeid) => {
    const res = await addpointAPI(activeid)
    if (res) {
        message.success('加分成功，一共加分' + res.updatedCount + '人')
    } else {
        message.error('加分失败，请重试')
    }
}

const getActivitieStatusText = (status: number): string => {
    return ActivitieStatus[status] ?? '未知状态';
};

const getStatusColor = (status: number) => {
    const colors = {
        4: 'blue',
        3: 'green',
        2: 'orange',
        1: 'red'
    }
    return colors[status] || 'gray';
}

onMounted(() => {
    getActiveList()
})
</script>

<template>
    <div class="p-4 bg-white rounded-lg shadow-sm">
        <a-page-header title="学生积分管理" class="p-0 mb-6" :style="{ borderBottom: '1px solid #f0f0f0' }" />

        <a-empty v-if="activeList.length === 0" description="暂无需要加分的活动"
            class="!flex flex-col items-center justify-center py-12">
            <template #extra>
                <a-button type="primary" href="/createactiveadmin">前往创建活动</a-button>
            </template>
        </a-empty>

        <div v-else class="flex flex-col gap-4">
            <div v-for="item in activeList" :key="item.id"
                class="flex flex-col md:flex-row items-start md:items-center p-4 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors">
                <div class="flex-1 flex flex-col md:flex-row items-start md:items-center gap-4 mb-2 md:mb-0">
                    <div class="flex flex-col">
                        <span class="text-lg font-medium text-gray-800">{{ item.title }}</span>
                        <div class="flex items-center gap-2 mt-1">
                            <a-tag :color="getStatusColor(item.activitStatus)" class="!m-0 !px-2 !py-1 !text-xs">
                                {{ getActivitieStatusText(item.activitStatus) }}
                            </a-tag>
                        </div>
                    </div>
                </div>

                <a-button type="primary" size="small" class="!h-8 md:ml-auto" :disabled="item.activitStatus !== 4"
                    @click="addPotin(item.id)">
                    加分该活动
                    <template #icon><plus-outlined /></template>
                </a-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
@media (max-width: 768px) {
    .ant-empty {
        @apply !px-0;
    }
}
</style>