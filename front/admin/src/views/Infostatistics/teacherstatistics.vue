<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, TitleComponent } from 'echarts/components';
import VChart from 'vue-echarts';
import dayjs from 'dayjs';
import { getAllRegistrationsAPI } from '@/api/registration';
import { getActiveListAPI } from '@/api/active';

const allRegistrationsData = ref([]);
const allActiveData = ref([]);

const monthlyData = ref({}); // 每月统计数据
const monthlyActivityCounts = ref({}); // 每月活动数量

const getAllRegistrations = async () => {
    const res = await getAllRegistrationsAPI();
    allRegistrationsData.value = res;
}

const getActiveList = async () => {
    const res = await getActiveListAPI();
    allActiveData.value = res;
}

// 注册 ECharts 模块
use([CanvasRenderer, BarChart, GridComponent, TooltipComponent, TitleComponent]);

// 数据处理：统计每月的活动人数和报名人数
const generateChartData = () => {
    const monthlyStats = {};
    const activityCounts = {};

    allActiveData.value.forEach((activity) => {
        const month = dayjs(activity.startDate).format('YYYY-MM');
        if (!monthlyStats[month]) {
            monthlyStats[month] = { totalPeople: 0, registeredPeople: 0 };
        }
        if (!activityCounts[month]) {
            activityCounts[month] = 0;
        }

        monthlyStats[month].totalPeople += activity.activitiePeopleNum;
        monthlyStats[month].registeredPeople += (activity.activitiePeopleNum - activity.remainingNum);
        activityCounts[month]++;
    });

    monthlyData.value = monthlyStats;
    monthlyActivityCounts.value = activityCounts;

    enhanceChartOptions();
};

const chartOptions = ref({});
const chartOptions2 = ref({});

// 新增计算方法
const calculateAverageParticipation = () => {
  const months = Object.keys(monthlyData.value);
  if (months.length === 0) return 0;

  const total = months.reduce((sum, month) => {
    const { totalPeople, registeredPeople } = monthlyData.value[month];
    return totalPeople > 0 ? sum + (registeredPeople / totalPeople) : sum;
  }, 0);

  return ((total / months.length) * 100).toFixed(1);
};

const getMostActiveMonth = () => {
  let maxCount = 0;
  let maxMonth = '';

  Object.entries(monthlyActivityCounts.value).forEach(([month, count]) => {
    if (count > maxCount) {
      maxCount = count;
      maxMonth = month;
    }
  });

  return maxMonth ? `${maxMonth} (${maxCount}个活动)` : '暂无数据';
};

// 增强图表配置
const enhanceChartOptions = () => {
  const months = Object.keys(monthlyData.value).sort();

  // 参与情况图表配置
  chartOptions.value = {
    color: ['#3b82f6', '#10b981'],
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const [registered, unregistered] = params;
        return `
          ${params[0].axisValue}<br/>
          ${registered.marker} ${registered.seriesName}: ${registered.value}<br/>
          ${unregistered.marker} ${unregistered.seriesName}: ${unregistered.value}<br/>
          总人数: ${registered.value + unregistered.value}
        `;
      }
    },
    xAxis: {
      type: 'category',
      data: months,
      axisLabel: {
        rotate: 45,
        interval: 0
      }
    },
    legend: {
      bottom: 0
    },
    grid: {
      top: '15%',
      containLabel: true
    },
    series: [
      {
        name: '已报名人数',
        type: 'bar',
        stack: 'total',
        barWidth: '60%',
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
        },
        data: months.map(month => monthlyData.value[month].registeredPeople)
      },
      {
        name: '未报名人数',
        type: 'bar',
        stack: 'total',
        barWidth: '60%',
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{
              offset: 0, color: '#10b981'
            }, {
              offset: 1, color: '#34d399'
            }]
          }
        },
        data: months.map(month => monthlyData.value[month].totalPeople - monthlyData.value[month].registeredPeople)
      }
    ]
  };

  // 活动数量图表配置
  chartOptions2.value = {
    color: ['#f59e0b'],
    xAxis: {
      type: 'category',
      data: months,
      axisLabel: {
        rotate: 45,
        interval: 0
      }
    },
    grid: {
      top: '15%',
      containLabel: true
    },
    series: [{
      name: '活动数量',
      type: 'bar',
      itemStyle: {
        borderRadius: [4, 4, 0, 0],
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{
            offset: 0, color: '#f59e0b'
          }, {
            offset: 1, color: '#fbbf24'
          }]
        }
      },
      data: months.map(month => monthlyActivityCounts.value[month])
    }]
  };
};

onMounted(async () => {
    await getAllRegistrations();
    await getActiveList();
    generateChartData();
});

watch([allRegistrationsData, allActiveData], () => {
    generateChartData();
});
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <a-page-header
      title="教学活动分析看板"
      class="p-0 mb-6"
      :style="{ borderBottom: '1px solid #f0f0f0' }"
    />

    <!-- 数据展示 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 参与情况分析 -->
      <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 class="text-lg font-medium text-gray-800 mb-4">月度参与情况</h3>
        <div class="h-80">
                <v-chart :option="chartOptions" autoresize />
            </div>
        <div class="mt-4 text-gray-600 text-sm">
          总活动数: {{ allActiveData.length }} 个
          | 平均参与率: {{ calculateAverageParticipation() }}%
            </div>
        </div>

      <!-- 活动数量统计 -->
      <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 class="text-lg font-medium text-gray-800 mb-4">月度活动趋势</h3>
        <div class="h-80">
          <v-chart :option="chartOptions2" autoresize />
    </div>
        <div class="mt-4 text-gray-600 text-sm">
          最活跃月份: {{ getMostActiveMonth() }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.echarts) {
  @apply w-full;
}
</style>
