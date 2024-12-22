<script setup>
import { ref } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { createActiveAPI } from '@/api/active';
import { message } from 'ant-design-vue';
const activeState = ref({
    title: '',
    content: '',
    time: '',
    activitieType: 0,
    activitiePeopleNum: 0,
    isOnline: 0,
    activeAddress: '',
    activitieImgUrl: '',

});
const onFinish = async (values) => {
    //const activeState.activitieType.value = +activeState.activitieType.value;
    const [starttime, endtime] = activeState.value.time; // 解构 time
    activeState.value.startDate = starttime; // 更新 starttime
    activeState.value.endDate = endtime;     // 更新 endtime
    delete activeState.value.time; // 删除 time
    const res = await createActiveAPI(activeState.value);
    if (res.code) {
        message.success('创建成功');
        return;
    }
};
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo); 
};
</script>
<template>
    <div class="flex flex-col">
        <h1 class="text-2xl font-bold m-2 text-center">创建活动</h1>
        <div class="w-full md:w-1/2 mx-auto p-2">
            <a-form :model="activeState" name="basic" autocomplete="off" @finish="onFinish">
                <a-form-item label="活动标题" name="title">
                    <a-input v-model:value="activeState.title" placeholder="请输入活动标题" />
                </a-form-item>
                <a-form-item name="content" label="活动详情">
                    <a-textarea v-model:value="activeState.content" placeholder="请输入活动详情" />
                </a-form-item>
                <a-form-item label="活动时间" name="time">
                    <a-range-picker v-model:value="activeState.time" />
                </a-form-item>
                <a-form-item label="活动类型" name="activitieType">
                    <a-select v-model:value="activeState.activitieType">
                        <a-select-option value=0>通用</a-select-option>
                        <a-select-option value=1>博学</a-select-option>
                        <a-select-option value=2>笃行</a-select-option>
                        <a-select-option value=3>尽美</a-select-option>
                        <a-select-option value=4>明德</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="活动人数" name="activitiePeopleNum">
                    <a-input-number v-model:value="activeState.activitiePeopleNum" placeholder="请输入活动人数"
                        class="w-1/3" />
                </a-form-item>
                <a-form-item label="是否线上" name="isOnline">
                    <a-radio-group v-model:value="activeState.isOnline">
                        <a-radio :value="0">线下</a-radio>
                        <a-radio :value="1">线上</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="活动地点" name="location">
                    <a-input v-model:value="activeState.activeAddress" placeholder="请输入活动地点" />
                </a-form-item>
                <a-form-item label="活动海报" name="activitieImgUrl">
                    <a-upload action="/upload.do" list-type="picture-card">
                        <div>
                            <PlusOutlined />
                            <div style="margin-top: 2px">上传海报</div>
                        </div>
                    </a-upload>
                </a-form-item>
                <a-form-item class="flex justify-end">
                    <a-button type="primary" html-type="submit">创建活动</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>