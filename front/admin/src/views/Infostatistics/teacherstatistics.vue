<script setup lang="ts">
import { useUserStore } from '@/stores/userstore';
import { defineComponent, ref, onMounted } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, TitleComponent } from 'echarts/components';
import VChart from 'vue-echarts';
import dayjs from 'dayjs';
import { getAllRegistrationsAPI } from '@/api/registration';

const allRegistrationsData = ref([]);

const getAllRegistrations = async () => {
    const res = await getAllRegistrationsAPI();
    allRegistrationsData.value = res;
}

// 初始化一个对象，用于存储每个月的活动数量

// 注册 ECharts 模块
use([CanvasRenderer, BarChart, GridComponent, TooltipComponent, TitleComponent]);

// 图表配置
const chartOptions = ref({
    title: {
        text: '销售数据',
        left: 'center',
    },
    tooltip: {
        trigger: 'axis',
    },
    xAxis: {
        type: 'category',
        data: ['一月', '二月', '三月', '四月', '五月'],
    },
    yAxis: {
        type: 'value',
    },
    series: [
        {
            name: '销售额',
            type: 'bar',
            data: [500, 700, 900, 600, 1000],
        },
    ],
});

const chartOptions2 = ref({
    title: {
        text: '报名人数',
        left: 'center',
    },
    tooltip: {
        trigger: 'axis',
    },
    xAxis: {
        type: 'category',
        data: ['一月', '二月', '三月', '四月', '五月'],
    },
    yAxis: {
        type: 'value',
    },
    series: [
        {
            name: '用户数',
            type: 'bar',
            data: [100, 150, 200, 120, 180],
        },
    ],
})

onMounted(() => {
    getAllRegistrations()
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