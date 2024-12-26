<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import dayjs from 'dayjs';
import { message } from 'ant-design-vue';
import { updateActiveAPI, getActiveByCreatUser, getActiveStatusAPI } from '@/api/active';
import { ActivitieStatus } from '@/dto/activeDto';
import { useUserStore } from '@/stores/userstore';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const userRole = userStore.userInfo?.role;

const activeList = ref([]);

//根据不同角色显示不同功能区
const getActiveList = async () => {
    if (userRole === 1) {
        const res = await getActiveByCreatUser()
        activeList.value = res;
    } else if (userRole === 2 || userRole === 3) {
        const res = await getActiveStatusAPI([1]);
        activeList.value = res;
    }
}

//emnu匹配
const getActivitieStatusText = (status: number): string => {
    return ActivitieStatus[status] ?? '未知状态';
};

//审核按钮显示


//快捷更改状态按钮
const requestReview = async (id: number) => {
    const res = await updateActiveAPI(id, { activitStatus: 1 });
    if (res) {
        message.success('发起申请成功');
        getActiveList();
    }
}

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
    <div class="flex flex-col">
        <div v-if="userRole === 1" class="m-2 flex flex-col">
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
                        :disabled="!(item.activitStatus == 2 || item.activitStatus == 3)">开启报名</a-button>
                </div>

            </div>
        </div>
        <div v-else-if="userRole === 2 || userRole === 3" class="flex flex-col">
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
        <div v-else class="text-center items-center font-bold text-3xl text-red-500">
            没有权限
        </div>
    </div>
</template>