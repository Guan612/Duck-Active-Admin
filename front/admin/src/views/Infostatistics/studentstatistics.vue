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
    const month = date.format('YYYY-MM');
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
      data: Object.keys(monthlyStats.value),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '活动数量',
        type: 'bar',
        data: Object.values(monthlyStats.value),
      },
    ],
    color: ['#3b82f6'],
    grid: {
      left: '5%',
      right: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: Object.keys(monthlyStats.value),
      axisLabel: {
        rotate: 45,
        interval: 0
      }
    },
    series: [{
      name: '活动数量',
      type: 'bar',
      data: Object.values(monthlyStats.value),
      itemStyle: {
        borderRadius: [4, 4, 0, 0],
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{
            offset: 0, color: '#3b82f6'
          }, {
            offset: 1, color: '#60a5fa'
          }]
        }
      }
    }]
  };

  // 计算参加人数
  let participated = 0;
  let notParticipated = 0;

  activeList.value.forEach(entry => {
    const attended = entry.activitiePeopleNum - entry.remainingNum;
    participated += attended;
    notParticipated += entry.remainingNum;
  });

  // 更新饼状图配置
  chartOptions2.value = {
    title: {
      text: '总参加人数统计',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: ({ name, value }) => `${name}: ${value}人` // 添加了人数显示
    },
    legend: {
      bottom: 0,
      formatter: (name) => `${name} ${name === '已参加' ? participated : notParticipated}人`,
      itemWidth: 14,
      textStyle: {
        color: '#666'
      }
    },
    series: [
      {
        name: '参与情况',
        type: 'pie',
        radius: '50%',
        data: [
          { value: participated, name: '未参加' },
          { value: notParticipated, name: '已参加' },
        ],
        label: {
          show: true,
          formatter: ({ name, value }) => `${name}\n{bold|${value}人}`,
          rich: { // 添加富文本样式
            bold: {
              fontWeight: 'bold',
              fontSize: 16
            }
          }
        },
        itemStyle: {
          borderRadius: 6,
          borderColor: '#fff',
          borderWidth: 2
        }
      }
    ],
    color: ['#10b981', '#f59e0b']
  };
};

// 注册 ECharts 模块
use([CanvasRenderer, BarChart, PieChart, GridComponent, TooltipComponent, TitleComponent, LegendComponent]);

watch(activeList, () => {
  if (activeList.value.length > 0) {
    const total = activeList.value.reduce((sum, item) => sum + item.activitiePeopleNum, 0);
    const attended = activeList.value.reduce((sum, item) => sum + (item.activitiePeopleNum - item.remainingNum), 0);
    participationRate.value = total > 0 ? attended / total : 0;
  }
});

onMounted(() => {
  getActiveByCreatUser();
});
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <a-page-header title="活动数据分析看板" class="p-0 mb-6" :style="{ borderBottom: '1px solid #f0f0f0' }" />

    <!-- 加载状态 -->
    <a-spin v-if="loading" class="!flex justify-center py-12" tip="数据加载中..." />

    <!-- 错误状态 -->
    <a-alert v-else-if="error" type="error" :message="error" show-icon class="mb-6" />

    <!-- 空状态 -->
    <a-empty v-else-if="activeList.length === 0" description="暂无统计数据可显示" class="!flex flex-col items-center py-12" />

    <!-- 数据展示 -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 月度活动统计 -->
      <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 class="text-lg font-medium text-gray-800 mb-4">月度活动趋势</h3>
        <div class="h-64 sm:h-80">
          <v-chart :option="chartOptions" autoresize />
        </div>
        <div class="mt-4 text-gray-600 text-sm">
          共统计 {{ activeList.length }} 个活动，覆盖 {{ Object.keys(monthlyStats).length }} 个月份
        </div>
      </div>

      <!-- 参与情况统计 -->
      <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 class="text-lg font-medium text-gray-800 mb-4">参与情况分析</h3>
        <div class="h-64 sm:h-80">
          <v-chart :option="chartOptions2" autoresize />
        </div>
        <!-- <div class="mt-4 text-gray-600 text-sm">
          已参加/未参加{{}}
        </div> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.echarts) {
  @apply w-full;
}
</style>
