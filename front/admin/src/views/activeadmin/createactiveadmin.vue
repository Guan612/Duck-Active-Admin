<script setup>
import { ref } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { createActiveAPI } from '@/api/active';
import { uploadImgAPI } from '@/api/upload';
import { message } from 'ant-design-vue';
import { useUserStore } from '@/stores/userstore';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const fileList = ref([]);

const activeState = ref({
  title: '',
  content: '',
  time: '',
  activitieType: 0,
  activitiePeopleNum: 1,
  point: 1,
  isOnline: 0,
  activeAddress: '',
  activitieImgUrl: '',
  createdPeople: userStore.userInfo.id,
});

const handleFinish = async () => {
  const [starttime, endtime] = activeState.value.time;
  activeState.value.startDate = starttime;
  activeState.value.endDate = endtime;
  delete activeState.value.time;
  const res = await createActiveAPI(activeState.value);
  if (res.title) {
    message.success('活动' + res.title + '创建成功');
    fileList.value = [];
    activeState.value = {
      title: '',
      content: '',
      time: '',
      activitieType: 0,
      activitiePeopleNum: 1,
      point: 1,
      isOnline: 0,
      activeAddress: '',
      activitieImgUrl: '',
      createdPeople: userStore.userInfo.id,
    };
    router.push('/activeadmin/responisble');
  } else {
    message.error(res)
  }
};

const uploadActiveImg = async (file) => {
  try {
    const res = await uploadImgAPI(file);
    if (res.url) {
      activeState.value.activitieImgUrl = res.url;
      return res.url;
    } else {
      throw new Error('后端未返回有效的 URL');
    }
  } catch (error) {
    throw new Error(error.message || '文件上传失败');
  }
};

const handleCustomUpload = async (options) => {
  const { file, onSuccess, onError } = options;
  try {
    const url = await uploadActiveImg(file);
    message.success('上传成功');
    fileList.value.push({
      uid: file.uid,
      name: file.name,
      status: 'done',
      url,
    });
    onSuccess({ url });
  } catch (error) {
    message.error(error.message);
    onError(error);
  }
};

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <a-page-header title="创建新活动" class="p-0 mb-6" :style="{ borderBottom: '1px solid #f0f0f0' }" />

    <a-form :model="activeState" layout="vertical" class="max-w-3xl mx-auto" @finish="handleFinish">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <a-form-item label="活动标题" name="title" :rules="[{ required: true, message: '请输入活动标题' }]">
            <a-input v-model:value="activeState.title" placeholder="请输入活动标题" class="!h-10" />
          </a-form-item>
          <a-form-item label="活动时间" name="time" :rules="[{ required: true, message: '请选择活动时间' }]">
            <a-range-picker v-model:value="activeState.time" />
          </a-form-item>
          <a-form-item label="活动类型" name="activitieType" :rules="[{ required: true, message: '请选择活动类型' }]">
            <a-select v-model:value="activeState.activitieType" class="w-full" option-label-prop="label" :options="[
              { value: 0, label: '通用', color: 'gray' },
              { value: 1, label: '博学', color: 'blue' },
              { value: 2, label: '笃行', color: 'green' },
              { value: 3, label: '尽美', color: 'orange' },
              { value: 4, label: '明德', color: 'purple' }
            ]">
              <template #option="{ label, color }">
                <a-tag :color="color" class="!m-0">{{ label }}</a-tag>
              </template>
              <template #selectedLabel="{ label }">
                <span class="text-gray-600">{{ label }}</span>
              </template>
            </a-select>
          </a-form-item>
        </div>

        <div class="space-y-4">
          <a-form-item label="活动分数" name="point" :rules="[{ required: true, message: '请输入活动分数' }]">
            <a-input-number v-model:value="activeState.point" :min="1" class="!w-full !h-10" />
          </a-form-item>
          <a-form-item label="活动人数" name="activitiePeopleNum">
            <a-input-number v-model:value="activeState.activitiePeopleNum" :min="1" class="!w-full !h-10" />
          </a-form-item>

          <a-form-item label="活动形式" name="isOnline">
            <a-radio-group v-model:value="activeState.isOnline" button-style="solid" class="w-full">
              <a-radio-button :value="0" class="w-1/2 text-center">线下活动</a-radio-button>
              <a-radio-button :value="1" class="w-1/2 text-center">线上活动</a-radio-button>
            </a-radio-group>
          </a-form-item>

          <a-form-item :label="activeState.isOnline ? '活动链接' : '活动地点'" name="activeAddress">
            <a-input v-model:value="activeState.activeAddress"
              :placeholder="activeState.isOnline ? '请输入在线会议链接' : '请输入详细活动地址'" class="!h-10" />
          </a-form-item>
        </div>
      </div>

      <a-form-item label="活动详情" name="content" class="!mt-6">
        <a-textarea v-model:value="activeState.content" placeholder="请输入活动详细说明" :rows="4" class="!resize-none"
          show-count :maxlength="300" />
      </a-form-item>

      <a-form-item label="活动海报" name="activitieImgUrl" class="!mt-6">
        <a-upload :custom-request="handleCustomUpload" v-model:file-list="fileList" list-type="picture-card"
          :max-count="1">
          <div v-if="fileList.length === 0" class="text-gray-600">
            <PlusOutlined class="text-2xl" />
            <div class="mt-2">点击上传海报</div>
            <div class="text-xs text-gray-400">建议尺寸 1200x630px</div>
          </div>
        </a-upload>
      </a-form-item>

      <a-form-item class="!mt-8">
        <a-button type="primary" html-type="submit" size="large" class="!h-12 !px-8 float-right" :loading="false">
          <template #icon>
            <PlusOutlined />
          </template>
          立即发布活动
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
:deep(.ant-upload-select) {
  @apply w-full h-48 md:w-48 md:h-48;
}
:deep(.ant-upload-list-item-container) {
  @apply w-full md:w-48;
}
</style>
