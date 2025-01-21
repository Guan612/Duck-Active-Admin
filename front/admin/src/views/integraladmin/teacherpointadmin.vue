<script setup lang="ts">
import { getAllIntegralAPI } from '@/api/integral';
import { onMounted, ref } from 'vue';

const integralList = ref([])

const getIntegralList = async () => {
    const res = await getAllIntegralAPI()
    integralList.value = res
}

onMounted(() => {
    getIntegralList()
})
</script>

<template>
    <div>教师积分管理</div>
    <div class="flex flex-col">
        <div v-for="item in integralList" class="flex bg-transblue m-1 p-1 rounded-lg">
            <div class="font-bold mx-2">{{ item.user.nickname || item.user.loginId }}</div>
            <div class="flex">
                <div>笃行：{{ item.actionPoints }}</div>
                <div>尽美：{{ item.beautyPoints }}</div>
                <div>博学：{{ item.learnedPoints }}</div>
                <div>明德：{{ item.moralPoints }}</div>
            </div>

        </div>
    </div>

</template>