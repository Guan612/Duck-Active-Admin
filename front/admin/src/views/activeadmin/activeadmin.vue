<script lang="ts" setup>
import { getActiveDetailAPI, updateActiveAPI } from '@/api/active';
import { ActivitieType } from '@/dto/activeDto';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { EditOutlined, CloseCircleOutlined, CheckCircleFilled } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

const router = useRouter();
const activedetail = ref({});
const activeForm = ref({
  id: '',
  title: '',
  activitieType: 0,
  startDate: '',
  endDate: '',
  activeAddress: '',
  activitiePeopleNum: 0,
  content: '',
  activitieImgUrl: ''
});
const activeOpen = ref(false);
const paramsid = router.currentRoute.value.params.id;

const getActivedetail = async (id: string) => {
    const res = await getActiveDetailAPI(id);
    activedetail.value = res;
    activeForm.value = {
        id: paramsid,
        ...res
    };
};

const handleSubmit = async () => {
  try {
    await updateActiveAPI(activeForm.value);
    message.success('活动信息更新成功');
    activeOpen.value = false;
    getActivedetail(paramsid);
  } catch (error) {
    message.error('更新失败: ' + error.message);
  }
};

const getActiveType = (type: number) => {
  return ActivitieType[type] ?? '未知类型';
};

const getTypeColor = (type: number) => {
  const colors = {
    0: 'gray',
    1: 'blue',
    2: 'green',
    3: 'orange',
    4: 'purple'
  };
  return colors[type] || 'gray';
};

onMounted(() => {
  getActivedetail(paramsid);
});

</script>

<template>
    <div class="bg-white rounded-lg shadow-sm p-6">
        <a-page-header title="活动管理详情" class="p-0 mb-6" :style="{ borderBottom: '1px solid #f0f0f0' }"
            @back="$router.push('/activeadmin/responisble')" />

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="relative h-72 lg:h-[480px] rounded-xl overflow-hidden border border-gray-200">
                <img :src="activedetail.activitieImgUrl" alt="活动海报" class="w-full h-full object-cover object-center" />
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-4">
                    <h1 class="text-2xl font-bold text-white">{{ activedetail.title }}</h1>
                </div>
            </div>

            <div class="space-y-6">
                <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div class="grid grid-cols-1 gap-4">
                        <div class="flex items-center">
                            <span class="text-gray-600 min-w-16">发起人:</span>
                            <a-tag color="blue">{{ activedetail.nickname || activedetail.loginId }}</a-tag>
                        </div>
                        <div class="flex items-center">
                            <span class="text-gray-600 min-w-16">类型:</span>
                            <a-tag :color="getTypeColor(activedetail.activitieType)" class="!uppercase">
                                {{ getActiveType(activedetail.activitieType) }}
                            </a-tag>
                        </div>
                        <div>
                            <span class="text-gray-600">时间:</span>
                            <div class="text-gray-800">
                                {{ dayjs(activedetail.startDate).format("YYYY-MM-DD HH:mm") }}
                                <span class="text-gray-400 mx-2">至</span>
                                {{ dayjs(activedetail.endDate).format("YYYY-MM-DD HH:mm") }}
                            </div>
                        </div>
                        <div>
                            <span class="text-gray-600">地点:</span>
                            <span class="text-gray-800">{{ activedetail.activeAddress }}</span>
                        </div>
                        <div>
                            <span class="text-gray-600">人数:</span>
                            <a-progress :percent="(activedetail.remainingNum / activedetail.activitiePeopleNum) * 100"
                                status="active" stroke-color="#3b82f6"
                                :format="() => `${activedetail.remainingNum || 0}/${activedetail.activitiePeopleNum || 0}`" />
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 class="text-gray-600 font-medium mb-2">活动详情</h3>
                    <pre class="whitespace-pre-wrap text-gray-800 leading-6">{{ activedetail.content }}</pre>
                </div>

                <div class="flex flex-col md:flex-row gap-3">
                    <a-button type="primary" size="large" class="!h-12 !px-8 !bg-blue-600 hover:!bg-blue-700"
            @click="activeOpen = true">
                        <edit-outlined />
                        修改活动信息
                    </a-button>
                    <a-button type="primary" danger size="large" class="!h-12 !px-8">
                        <close-circle-outlined />
                        取消审核
                    </a-button>
                    <a-button type="primary" size="large" class="!h-12 !px-8 !bg-green-600 hover:!bg-green-700">
                        <CheckCircleFilled />
                        更改活动状态
                    </a-button>
                </div>
            </div>
        </div>

        <a-modal v-model:open="activeOpen" title="修改活动信息" width="800px" :footer="null">
            <a-form layout="vertical" :model="activeForm" @finish="handleSubmit">
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="活动标题" name="title">
                            <a-input v-model:value="activeForm.title" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="活动类型" name="activitieType">
                            <a-select v-model:value="activeForm.activitieType">
                                <a-select-option v-for="(label, value) in ActivitieType"
                                  :key="value" :value="Number(value)" :label="label" />
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="开始时间" name="startDate">
                            <a-date-picker v-model:value="activeForm.startDate"
                              show-time format="YYYY-MM-DD HH:mm" style="width:100%" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="结束时间" name="endDate">
                            <a-date-picker v-model:value="activeForm.endDate"
                              show-time format="YYYY-MM-DD HH:mm" style="width:100%" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="活动地址" name="activeAddress">
                            <a-input v-model:value="activeForm.activeAddress" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="参与人数" name="activitiePeopleNum">
                            <a-input-number v-model:value="activeForm.activitiePeopleNum"
                              :min="1" style="width:100%" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="活动内容" name="content">
                            <a-textarea v-model:value="activeForm.content" :rows="6" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="活动封面" name="activitieImgUrl">
                            <a-input v-model:value="activeForm.activitieImgUrl" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24" class="flex justify-end gap-4">
                        <a-button @click="activeOpen = false">取消</a-button>
                        <a-button type="primary" html-type="submit">保存</a-button>
                    </a-col>
                </a-row>
            </a-form>
        </a-modal>
    </div>
</template>

<style scoped>
@reference "tailwindcss";

:deep(.ant-page-header) {
    @apply !pb-0 !mb-6;
}

:deep(.ant-modal-body) {
    @apply !p-6;
}
</style>
