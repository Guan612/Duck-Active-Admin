<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { updateActiveAPI, getActiveByCreatUser, getActiveStatusAPI } from '@/api/active';
import { ActivitieStatus } from '@/dto/activeDto';
import { message } from 'ant-design-vue';
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';

const activeList = ref([]);
const router = useRouter();

const getActiveList = async () => {
    const res = await getActiveStatusAPI([1]);
    activeList.value = res
}

//活动状态匹配
const getActivitieStatusText = (status: number): string => {
    return ActivitieStatus[status] ?? '未知状态';
};

//快速更改活动状态
const qucikPass = async (id: number) => {
    const res = await updateActiveAPI(id, { activitStatus: 2 });
    if (res) {
        message.success('审核通过');
        getActiveList();
    }
}

onMounted(() => {
    getActiveList();
})
</script>
<template>
    <div class='flex flex-col'>
        <div v-for="item in activeList" :key="item.id"
                class="flex flex-col md:flex-row justify-between items-center bg-transblue rounded-lg m-2 p-2">
            <div class="flex flex-col">
                <div>{{ item.title }}</div>
                <div>开始时间：{{ dayjs(item.startDate).format("YYYY-MM-DD") }}</div>
            </div>
             <div class="flex">
                <a-button @click="router.push(`/activedetailadmin/${item.id}`)" class="mx-2">详情</a-button>
                <a-button @click="qucikPass(item.id)">快速通过</a-button>
            </div>
        </div>
    </div>
</template>