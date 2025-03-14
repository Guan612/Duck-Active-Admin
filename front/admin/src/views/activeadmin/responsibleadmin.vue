<script setup lang="ts">
import { getActiveByCreatUserAPI, updateActiveAPI } from '@/api/active';
import { ActivitieStatus } from '@/dto/activeDto';
import { message } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  UploadOutlined,
  UserAddOutlined,
  EyeOutlined
} from '@ant-design/icons-vue';

const activeList = ref([]);
const router = useRouter();

const getActiveList = async () => {
    const res = await getActiveByCreatUserAPI();
    activeList.value = res;
}

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

const getStatusColor = (status: number) => {
  const statusColors = {
    0: 'geekblue',
    1: 'blue',
    2: 'green',
    3: 'cyan',
    6: 'orange'
  }
  return statusColors[status] || 'gray';
}

onMounted(() => {
    getActiveList();
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <a-page-header
      title="活动申请管理"
      class="p-0 mb-6"
      :style="{ borderBottom: '1px solid #f0f0f0' }"
    />

    <a-empty
      v-if="activeList.length === 0"
      description="暂无需要申请的活动"
      class="!flex flex-col items-center justify-center py-12"
    >
      <template #extra>
        <a-button type="primary" href="/createactiveadmin">立即创建活动</a-button>
</template>
    </a-empty>

    <div v-else class="flex flex-col gap-4">
      <div
        v-for="item in activeList"
        :key="item.id"
        class="flex flex-col md:flex-row items-start md:items-center p-4 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors"
      >
        <div class="flex-1 flex flex-col gap-2 mb-2 md:mb-0">
          <div class="flex items-center gap-3">
            <span class="text-lg font-medium text-gray-800">{{ item.title }}</span>
            <a-tag :color="getStatusColor(item.activitStatus)" class="!m-0">
              {{ getActivitieStatusText(item.activitStatus) }}
            </a-tag>
          </div>
        </div>

        <div class="flex flex-col md:flex-row items-stretch gap-2 w-full md:w-auto">
          <a-button
            type="primary"
            size="small"
            :disabled="!(item.activitStatus == 0 || item.activitStatus == 6)"
            @click="requestReview(item.id)"
            class="!h-8"
          >
            <template #icon><upload-outlined /></template>
            发起审核
          </a-button>

          <a-button
            type="default"
            size="small"
            :disabled="!(item.activitStatus == 2 || item.activitStatus == 3)"
            class="!h-8"
          >
            <template #icon><user-add-outlined /></template>
            开启报名
          </a-button>

          <a-button
            type="link"
            size="small"
            @click="router.push(`/activeadmin/${item.id}`)"
            class="!h-8"
          >
            <template #icon><eye-outlined /></template>
            详情查看
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.ant-page-header-heading-title) {
  @apply !text-2xl;
}
</style>
