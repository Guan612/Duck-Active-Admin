<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { LeftOutlined } from '@ant-design/icons-vue';
import dayjs from 'dayjs';
import { getActiveDetailAPI, updateActiveAPI } from '@/api/active';
import { ActivitieType } from '@/dto/activeDto';
import { message } from 'ant-design-vue';

const router = useRouter();
const activedetail = ref({})
const paramsid = router.currentRoute.value.params.id;

const getActivedetail = async (id: string) => {
    const res = await getActiveDetailAPI(id);
    activedetail.value = res;
}

const getActiveType = (type: number) => {
    return ActivitieType[type] ?? '未知类型';
}

const pass = async (id: number) => {
    const res = await updateActiveAPI(id, { activitStatus: 2 });
    if (res) {
        message.success('审核通过');
        router.push('/activereviewadmin')
    }
}

const reject = async (id: number) => {
    const res = await updateActiveAPI(id, { activitStatus: 6 });
    if (res) {
        message.success('审核拒绝');
        router.push('/activereviewadmin')
    }
}

onMounted(() => {
    getActivedetail(paramsid);
})
</script>
<template>
    <div class="flex flex-col">
        <div class="flex flex-row justify-items-center items-center m-2">
            <a-button class="flex m-2 items-center" type="primary" @click="$router.push('/activereviewadmin')">
                <template #icon>
                    <LeftOutlined />
                </template>
                返回
            </a-button>
            <h1 class="text-2xl font-bold mb-4 m-2">活动详情</h1>
        </div>
        <div class="flex flex-col md:flex-row m-2">
            <div class="flex flex-col md:w-1/2">
                <img :src="activedetail.activitieImgUrl" alt="活动图片" class="m-2 rounded-lg object-cover" />
            </div>
            <div class="flex flex-col md:w-1/2">
                <div class="text-xl font-bold m-2">活动名称：{{ activedetail.title }}</div>
                <div class="text-lg m-2">活动发起人：{{ activedetail.nickname || activedetail.loginId }}</div>
                <div class="text-lg m-2">活动类型：{{ getActiveType(activedetail.activitieType) }}</div>
                <div class="text-lg m-2">
                    活动时间：{{ dayjs(activedetail.startDateDate).format("YYYY-MM-DD") }} - {{
                        dayjs(activedetail.endDate).format("YYYY-MM-DD") }}
                </div>
                <div class="text-lg m-2">活动地点：{{ activedetail.activeAddress }}</div>
                <div class="text-lg m-2">活动人数：{{ activedetail.activitiePeopleNum }}</div>
                <div class="text-lg m-2">活动详情：{{ activedetail.content }}</div>
                <div class="flex justify-end">
                    <a-button type='primary' class="mx-2" @click="pass(activedetail.id)">通过审核</a-button>
                    <a-button type="primary" danger @click="reject(activedetail.id)">拒绝通过</a-button>
                </div>
            </div>
        </div>
    </div>
</template>