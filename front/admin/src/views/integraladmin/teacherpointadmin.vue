<script setup lang="ts">
import { getAllIntegralAPI, updateIntegralAPI } from '@/api/integral';
import { onMounted, ref } from 'vue';
import type { IntegralItem } from '@/dto/integralDto';
import { message } from 'ant-design-vue';
import { SaveOutlined } from '@ant-design/icons-vue';

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
  <div class="p-4 bg-white rounded-lg shadow-sm">
    <a-page-header
      title="教师积分管理"
      class="p-0 mb-6"
      :style="{ borderBottom: '1px solid #f0f0f0' }"
    />

    <a-empty
      v-if="integralList.length === 0"
      description="暂无积分管理数据"
      class="!flex flex-col items-center justify-center py-12"
    />
    <div v-else class="flex flex-col gap-4">
      <div
        v-for="item in integralList"
        :key="item.userId"
        class="flex flex-col md:flex-row items-start md:items-center p-4 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors"
      >
        <!-- 用户信息 -->
        <div class="flex-1 flex items-center gap-4 mb-2 md:mb-0">
          <a-tag color="blue" class="!text-sm !px-3 !py-1.5">
            {{ item.user.nickname || item.user.loginId }}
          </a-tag>
        </div>

        <!-- 积分输入区域 -->
        <div class="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3 w-full md:w-auto">
          <div class="flex items-center gap-2">
            <span class="text-gray-600 text-sm min-w-[40px]">笃行:</span>
            <a-input-number
              v-model:value="item.actionPoints"
              :min="0"
              class="!w-full md:!w-32 !h-8"
              controls
            />
          </div>
          <div class="flex items-center gap-2">
            <span class="text-gray-600 text-sm min-w-[40px]">尽美:</span>
            <a-input-number
              v-model:value="item.beautyPoints"
              :min="0"
              class="!w-full md:!w-32 !h-8"
              controls
            />
          </div>
          <div class="flex items-center gap-2">
            <span class="text-gray-600 text-sm min-w-[40px]">博学:</span>
            <a-input-number
              v-model:value="item.learnedPoints"
              :min="0"
              class="!w-full md:!w-32 !h-8"
              controls
            />
          </div>
          <div class="flex items-center gap-2">
            <span class="text-gray-600 text-sm min-w-[40px]">明德:</span>
            <a-input-number
              v-model:value="item.moralPoints"
              :min="0"
              class="!w-full md:!w-32 !h-8"
              controls
            />
          </div>
        </div>

        <!-- 操作按钮 -->
        <a-button
          type="primary"
          class="!h-8 md:ml-4 mt-2 md:mt-0 !text-sm"
          @click="updateIntegral(item)"
        >
          <template #icon><SaveOutlined /></template>
          提交修改
        </a-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.ant-input-number-focused {
  @apply !border-blue-500 !shadow-sm;
}
</style>
