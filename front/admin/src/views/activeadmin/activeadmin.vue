<script lang="ts" setup>
import { getActiveDetailAPI } from '@/api/active';
import { ActivitieType } from '@/dto/activeDto';
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs';
const router = useRouter()

const activedetail = ref({})
const paramsid = router.currentRoute.value.params.id;

const getActivedetail = async (id: string) => {
    const res = await getActiveDetailAPI(id);
    activedetail.value = res;
}

const getActiveType = (type: number) => {
    return ActivitieType[type] ?? '未知类型';
}

onMounted(() => {
    getActivedetail(paramsid);
})



</script>
<template>
    <div>学生活动管理</div>
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
                    <a-button type='primary' class="mx-2" @click="">修改活动信息</a-button>
                    <a-button type="primary" danger @click="">取消审核</a-button>
                </div>
            </div>
        </div>
    </div>
</template>