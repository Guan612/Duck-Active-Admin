<script setup lang="ts">
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, PieChart } from 'echarts/charts';
import { use } from 'echarts/core';
import { GridComponent, TooltipComponent, TitleComponent, LegendComponent } from 'echarts/components';
import VChart from 'vue-echarts';
import dayjs from 'dayjs';
import { getActiveByCreatUserAPI } from '@/api/active';
import { onMounted, ref, watch } from 'vue';

interface ActiveItem {
  createdAt: string;
  activitiePeopleNum: number;
  remainingNum: number;
}

const activeList = ref<ActiveItem[]>([]);
const monthlyStats = ref<{ [key: string]: number }>({});
const participationRate = ref<number>(0);
const chartOptions = ref({});
const chartOptions2 = ref({});
const loading = ref(false);
const error = ref('');

// 获取活动数据
const getActiveByCreatUser = async () => {
  try {
    loading.value = true;
    error.value = '';
    const res = await getActiveByCreatUserAPI();
    activeList.value = res;
    updateCharts();
  } catch (err) {
    error.value = '获取数据失败，请稍后重试';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// 更新图表数据
const updateCharts = () => {
  // 统计每个月的活动数量
  monthlyStats.value = {};
  activeList.value.forEach(entry => {
    const date = dayjs(entry.createdAt);
    const month = date.format('YYYY-MM'); // 使用 dayjs 格式化日期为 "YYYY-MM"
    if (!monthlyStats.value[month]) {
      monthlyStats.value[month] = 0;
    }
    monthlyStats.value[month]++;
  });

  // 更新条形图配置
  chartOptions.value = {
    title: {
      text: '每月活动数量',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: Object.keys(monthlyStats.value), // 月份
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '活动数量',
        type: 'bar',
        data: Object.values(monthlyStats.value), // 每个月的活动数量
      },
    ],
  };

  //计算参加人数
  let participated = 0; // 已参加的人数
  let notParticipated = 0; // 未参加的人数

  activeList.value.forEach(entry => {
    const attended = entry.remainingNum; // 参加人数
    const notAttended = entry.activitiePeopleNum - attended; // 已参加人数
    participated += attended; // 累加已参加人数
    notParticipated += notAttended; // 累加未参加人数
  });

  // 更新饼状图配置
  chartOptions2.value = {
    title: {
      text: '总参加人数统计',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        name: '参与情况',
        type: 'pie',
        radius: '50%',
        data: [
          { value: participated, name: '已参加' },
          { value: notParticipated, name: '未参加' },
        ],
      },
    ],
  };

};

// 注册 ECharts 模块
use([CanvasRenderer, BarChart, PieChart, GridComponent, TooltipComponent, TitleComponent, LegendComponent]);

onMounted(() => {
  getActiveByCreatUser();
});
</script>

<template>
  <div class="flex flex-col">
    <div class="text-2xl font-bold m-2 text-center">活动管理统计</div>

    <div v-if="loading" class="text-center py-4">加载中...</div>
    <div v-else-if="error" class="text-red-500 text-center py-4">{{ error }}</div>
    <div v-else-if="activeList.length === 0" class="text-center py-4">暂无数据</div>
    <div v-else class="flex flex-col md:flex-row justify-center">
      <div class="w-full md:w-1/2 p-4 h-80">
        <v-chart :option="chartOptions" autoresize />
      </div>
      <div class="w-full md:w-1/2 p-4 h-80">
        <v-chart :option="chartOptions2" autoresize />
      </div>
    </div>
  </div>
</template>
