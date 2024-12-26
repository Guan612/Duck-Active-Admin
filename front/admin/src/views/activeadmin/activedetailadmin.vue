<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { LeftOutlined } from '@ant-design/icons-vue';
import { getActiveDetailAPI } from '@/api/active';

const router = useRouter();
const activedetail = ref({})
const paramsid = router.currentRoute.value.params.id;

const getActivedetail = async (id: string) => {
    const res = await getActiveDetailAPI(id);
    activedetail.value = res;
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
                <div>{{ activedetail.title }}</div>
            </div>
        </div>

    </div>
</template>