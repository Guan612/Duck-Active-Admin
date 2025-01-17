<script setup lang="ts">
import { ref, onMounted } from 'vue';
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


// 初始化一个对象，用于存储每个月的活动数量

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
};

// 图表配置1：堆叠柱状图（总人数和报名人数）

const months = Object.keys(monthlyData.value).sort();
const totalPeople = months.map((month) => monthlyData.value[month].totalPeople);
const registeredPeople = months.map((month) => monthlyData.value[month].registeredPeople);

const chartOptions = ref({
    title: {
        text: '每月活动总人数和报名人数',
        left: 'center',
    },
    tooltip: {
        trigger: 'axis',
    },
    xAxis: {
        type: 'category',
        data: months,
    },
    yAxis: {
        type: 'value',
    },
    series: [
        {
            name: '总人数',
            type: 'bar',
            stack: 'total',
            data: totalPeople,
        },
        {
            name: '报名人数',
            type: 'bar',
            stack: 'total',
            data: registeredPeople,
        },
    ],
});


// 图表配置2：柱状图（每月活动数量）

const months2 = Object.keys(monthlyActivityCounts.value).sort();
const activityCounts = months.map((month) => monthlyActivityCounts.value[month]);

const chartOptions2 = ref( {
    title: {
        text: '每月活动数量',
        left: 'center',
    },
    tooltip: {
        trigger: 'axis',
    },
    xAxis: {
        type: 'category',
        data: months2,
    },
    yAxis: {
        type: 'value',
    },
    series: [
        {
            name: '活动数量',
            type: 'bar',
            data: activityCounts,
        },
    ],
});


onMounted(() => {
    getAllRegistrations()
    getActiveList()
})

</script>
<template>
    <div class="flex flex-col">
        <div class="text-2xl font-bold m-2 text-center">活动管理统计</div>
        <div class="flex flex-col md:flex-row justify-center">
            <div class="w-full md:w-1/3 p-4 h-80">
                <v-chart :option="chartOptions" />
            </div>
            <div class="w-full md:w-1/3 p-4 h-80">
                <v-chart :option="chartOptions2" />
            </div>
            <div class="w-full md:w-1/3 p-4 h-80">
                <v-chart :option="chartOptions" />
            </div>
        </div>
    </div>
</template>