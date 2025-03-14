<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { LeftOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons-vue';
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
        router.push('/activeadmin/teacher')
    }
}

const reject = async (id: number) => {
    const res = await updateActiveAPI(id, { activitStatus: 6 });
    if (res) {
        message.success('审核拒绝');
        router.push('/activeadmin/teacher')
    }
}

onMounted(() => {
    getActivedetail(paramsid);
})
</script>
<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <a-page-header
      title="活动详情"
      class="p-0 mb-6"
      :style="{ borderBottom: '1px solid #f0f0f0' }"
      @back="$router.push('/activeadmin/teacher')"
    />

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 图片区域 -->
      <div class="relative h-80 lg:h-[480px] rounded-xl overflow-hidden border border-gray-200">
        <img
          :src="activedetail.activitieImgUrl"
          alt="活动图片"
          class="w-full h-full object-cover object-center"
        />
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-4">
          <h1 class="text-2xl font-bold text-white">{{ activedetail.title }}</h1>
        </div>
      </div>

      <!-- 信息区域 -->
      <div class="space-y-6">
        <!-- 基本信息卡片 -->
        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div class="grid grid-cols-2 gap-4 text-gray-600">
            <div>
              <span class="font-medium">发起人:</span>
              <a-tag color="blue" class="!ml-2">{{ activedetail.nickname || activedetail.loginId }}</a-tag>
            </div>
            <div>
              <span class="font-medium">类型:</span>
              <a-tag color="geekblue" class="!ml-2">{{ getActiveType(activedetail.activitieType) }}</a-tag>
            </div>
            <div>
              <span class="font-medium">时间:</span>
              <span class="ml-2 text-gray-800">
                {{ dayjs(activedetail.startDate).format("YYYY-MM-DD HH:mm") }}
                <span class="text-gray-400">至</span>
                {{ dayjs(activedetail.endDate).format("YYYY-MM-DD HH:mm") }}
              </span>
            </div>
            <div>
              <span class="font-medium">地点:</span>
              <span class="ml-2 text-gray-800">{{ activedetail.activeAddress }}</span>
            </div>
            <div class="col-span-2">
              <span class="font-medium">活动人数：{{activedetail.activitiePeopleNum}}人</span>
            </div>
          </div>
        </div>

        <!-- 详细描述 -->
        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 class="font-medium text-gray-600 mb-2">活动详情</h3>
          <pre class="whitespace-pre-wrap font-sans text-gray-800">{{ activedetail.content }}</pre>
        </div>

        <!-- 操作按钮 -->
        <div class="flex flex-col gap-3 lg:flex-row lg:justify-end">
          <a-button
            type="primary"
            size="large"
            class="!h-12 !px-8 !bg-green-600 hover:!bg-green-700"
            @click="pass(activedetail.id)"
          >
            <CheckCircleOutlined />
            通过审核
          </a-button>
          <a-button
            type="primary"
            danger
            size="large"
            class="!h-12 !px-8"
            @click="reject(activedetail.id)"
          >
            <CloseCircleOutlined />
            拒绝通过
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
