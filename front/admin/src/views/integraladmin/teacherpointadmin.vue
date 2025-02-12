<script setup lang="ts">
import { getAllIntegralAPI, updateIntegralAPI } from '@/api/integral';
import { onMounted, ref } from 'vue';
import type { IntegralItem } from '@/dto/integralDto';
import { message } from 'ant-design-vue';

const integralList = ref<IntegralItem[]>([])

const getIntegralList = async () => {
  const res = await getAllIntegralAPI()
  integralList.value = res
}

const updateIntegral = async (item: IntegralItem) => {
  try {
    await updateIntegralAPI(item.userId, {
      learnedPoints: item.learnedPoints,
      actionPoints: item.actionPoints,
      beautyPoints: item.beautyPoints,
      moralPoints: item.moralPoints
    });
    getIntegralList()
    message.success('更新成功');
  } catch (error) {
    console.error('更新失败:', error);
    message.error('更新失败');
  }
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
      <div class="flex flex-row justify-center items-center">
        <div>笃行：<a-input-number v-model:value="item.actionPoints" type="number" class="w-16" /></div>
        <div>尽美：<a-input-number v-model:value="item.beautyPoints" type="number" class="w-16" /></div>
        <div>博学：<a-input-number v-model:value="item.learnedPoints" type="number" class="w-16" /></div>
        <div>明德：<a-input-number v-model:value="item.moralPoints" type="number" class="w-16" /></div>
      </div>
      <button @click="updateIntegral(item)" class="ml-4 px-2 bg-blue-500 text-white rounded">提交</button>
    </div>
  </div>
</template>
