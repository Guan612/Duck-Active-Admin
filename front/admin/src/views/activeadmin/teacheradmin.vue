<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { updateActiveAPI, getActiveByCreatUser, getActiveStatusAPI } from '@/api/active';
import { ActivitieStatus } from '@/dto/activeDto';
import { message } from 'ant-design-vue';
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';
import {
    CheckCircleOutlined,
    EyeOutlined,
    CalendarOutlined,
    FileSearchOutlined
} from '@ant-design/icons-vue';

const activeList = ref([]);
const router = useRouter();

const getActiveList = async () => {
    const res = await getActiveStatusAPI([1]);
    activeList.value = res;
}

//活动状态匹配
const getActivitieStatusText = (status: number): string => {
    return ActivitieStatus[status] ?? '未知状态';
};

//快速更改活动状态
const qucikPass = async (id: number) => {
    const res = await updateActiveAPI(id, { activitStatus: 2 });
    if (res) {
        message.success('审核通过');
        getActiveList();
    }
}

onMounted(() => {
    getActiveList();
})
</script>

<template>
    <div class="p-4 bg-gray-50 min-h-screen">
        <a-card title="活动审核管理" class="rounded-xl shadow-sm">
            <!-- 加载状态 -->
            <a-skeleton v-if="activeList.length === 0" active />

            <!-- 活动列表 -->
            <a-row v-else :gutter="[16, 16]">
                <a-col
                    v-for="item in activeList"
                    :key="item.id"
                    :xs="24"
                    :sm="24"
                    :md="12"
                >
                    <a-card class="rounded-lg hover:shadow-md transition-all duration-300">
                        <div class="flex flex-col md:flex-row gap-4 items-start">
                            <!-- 活动信息 -->
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-2 mb-2">
                                    <a-tag color="orange" class="text-sm">
                                        {{ getActivitieStatusText(item.activitStatus) }}
                                    </a-tag>
                                    <div class="text-lg font-semibold truncate">{{ item.title }}</div>
                                </div>
                                <div class="space-y-1 text-gray-600">
                                    <div class="flex items-center">
                                        <calendar-outlined class="mr-2 text-blue-500" />
                                        <span>{{ dayjs(item.startDate).format("YYYY/MM/DD HH:mm") }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- 操作按钮 -->
                            <div class="flex flex-col gap-2 w-full md:w-auto">
                                <a-button
                                    @click="router.push(`/activedetailadmin/${item.id}`)"
                                    block
                                    class="flex items-center"
                                >
                                    <eye-outlined class="mr-2" />
                                    查看详情
                                </a-button>
                                <a-button
                                    type="primary"
                                    @click="qucikPass(item.id)"
                                    block
                                    class="flex items-center"
                                >
                                    <check-circle-outlined class="mr-2" />
                                    一键通过
                                </a-button>
                            </div>
                        </div>
                    </a-card>
                </a-col>
            </a-row>

            <!-- 空状态 -->
            <a-empty
                v-if="activeList.length === 0"
                class="mt-12"
                description="暂未有待审核活动"
            >
                <template #image>
                    <file-search-outlined style="font-size: 48px; color: #999" />
</template>
            </a-empty>
        </a-card>
    </div>
</template>
