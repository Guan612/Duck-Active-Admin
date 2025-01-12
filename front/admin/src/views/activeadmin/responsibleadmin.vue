<script setup lang="ts">
import { getActiveByCreatUserAPI, updateActiveAPI } from '@/api/active';
import { ActivitieStatus } from '@/dto/activeDto';
import { message } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const activeList = ref([]);
const router = useRouter();

const getActiveList = async () => {
    const res = await getActiveByCreatUserAPI();
    activeList.value = res;
}

//申请按钮
const requestReview = async (id: number) => {
    const res = await updateActiveAPI(id, { activitStatus: 1 });
    if (res) {
        message.success('发起申请成功');
        getActiveList();
    }
}

const getActivitieStatusText = (status: number): string => {
    return ActivitieStatus[status] ?? '未知状态';
};

onMounted(() => {
    getActiveList();
})
</script>
<template>
    <div class="flex flex-col">
        <div v-for="item in activeList" :key="item.id"
                class="flex flex-col md:flex-row justify-between items-center bg-transblue rounded-lg m-2 p-2">
                <div>
                    <div class="font-bold text-xl">{{ item.title }}</div>
                    <div>活动状态：{{ getActivitieStatusText(item.activitStatus) }}</div>
                </div>

                <div>
                    <a-button @click="requestReview(item.id)"
                        :disabled="!(item.activitStatus == 0 || item.activitStatus == 6)" class="mx-2">
                        发起审核申请
                    </a-button>
                    <a-button @click=""
                        :disabled="!(item.activitStatus == 2 || item.activitStatus == 3)" class="" >开启报名</a-button>
                    <a-button @click="router.push(`/activeadmin/${item.id}`)" class="mx-2">查看详情</a-button>
                </div>
        </div>
    </div>
</template>