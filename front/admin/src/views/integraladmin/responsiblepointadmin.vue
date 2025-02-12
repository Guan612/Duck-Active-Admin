<script setup lang="ts">
import { getActiceByActiveIdAPI, getActiveByCreatUserAPI } from '@/api/active';
import { addpointAPI } from '@/api/integral'
import { ActivitieStatus } from '@/dto/activeDto';
import { onMounted, ref } from 'vue';

const activeList = ref([]);
const getActiveList = async () => {
    const res = await getActiveByCreatUserAPI()
    activeList.value = res
}

const addPotin = async (activeid) => {
    const res = await addpointAPI(activeid)
}

const getActivitieStatusText = (status: number): string => {
    return ActivitieStatus[status] ?? '未知状态';
};

onMounted(() => {
    getActiveList()
})
</script>

<template>
    <div>学生积分管理</div>
    <div class="flex flex-col">
        <div v-if="activeList.length > 0">
            <div v-for="item in activeList" :key="item.id"
                class="flex flex-col md:flex-row justify-between items-center bg-transblue rounded-lg m-2 p-2">
                <div>
                    <div class="font-bold text-xl">{{ item.title }}</div>
                    <div class="">{{ getActivitieStatusText(item.activitStatus) }}</div>
                </div>
                <div>
                    <div class="">
                        <a-button type='primary' class="mx-2" @click="addPotin(item.id)"
                            :disabled="!(item.activitStatus == 4)">加分该活动</a-button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="text-center font-bold text-2xl items-center">暂时没有需要加分的活动</div>
            <div class="text-center"><a href="/createactiveadmin">去创建活动</a></div>
        </div>
    </div>
</template>