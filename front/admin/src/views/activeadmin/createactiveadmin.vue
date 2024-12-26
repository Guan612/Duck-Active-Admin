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
// 文件列表
const fileList = ref([]);

const activeState = ref({
    title: '',
    content: '',
    time: '',
    activitieType: 0,
    activitiePeopleNum: 0,
    isOnline: 0,
    activeAddress: '',
    activitieImgUrl: '',
    createdPeople: userStore.userInfo.id, // 创建人
});

//创建活动提交
const handleFinish = async () => {
    const [starttime, endtime] = activeState.value.time; // 解构 time
    activeState.value.startDate = starttime; // 更新 starttime
    activeState.value.endDate = endtime;     // 更新 endtime
    delete activeState.value.time; // 删除 time
    const res = await createActiveAPI(activeState.value);
    if (res.title) {
        message.success('活动' + res.title + '创建成功');
        fileList.value = [];
        activeState.value = {
            title: '',
            content: '',
            time: '',
            activitieType: 0,
            activitiePeopleNum: 0,
            isOnline: 0,
            activeAddress: '',
            activitieImgUrl: '',
            createdPeople: userStore.userInfo.id, // 创建人
        };
        router.push('/activereviewadmin');
    } else {
        message.error(res)
    }
};

const uploadActiveImg = async (file) => {
    try {
        const res = await uploadImgAPI(file); // 请求后端上传文件并获取 URL
        if (res.url) {
            activeState.value.activitieImgUrl = res.url; // 存储图片 URL
            return res.url; // 返回 URL
        } else {
            throw new Error('后端未返回有效的 URL');
        }
    } catch (error) {
        throw new Error(error.message || '文件上传失败');
    }
};

// 自定义上传函数
const handleCustomUpload = async (options) => {
    const { file, onSuccess, onError } = options; // 提取参数
    try {
        const url = await uploadActiveImg(file); // 上传文件并获取 URL
        message.success('上传成功'); // 提示上传成功
        fileList.value.push({
            uid: file.uid,
            name: file.name,
            status: 'done',
            url, // 将后端返回的 URL 添加到 fileList
        });
        onSuccess({ url }); // 通知组件上传成功
    } catch (error) {
        message.error(error.message); // 提示上传失败
        onError(error); // 通知组件上传失败
    }
};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};
</script>
<template>
    <div class="flex flex-col">
        <h1 class="text-2xl font-bold m-2 text-center">创建活动</h1>
        <div class="w-full md:w-3/5 mx-auto p-2">
            <a-form :model="activeState" name="basic" autocomplete="off" @finish="handleFinish">
                <a-form-item label="活动标题" name="title" :rules="[{ required: true, message: '请输入活动标题' }]">
                    <a-input v-model:value="activeState.title" placeholder="请输入活动标题" />
                </a-form-item>
                <a-form-item name="content" label="活动详情">
                    <a-textarea v-model:value="activeState.content" placeholder="请输入活动详情" show-count :maxlength="100" />
                </a-form-item>
                <a-form-item label="活动时间" name="time" :rules="[{ required: true, message: '请选择活动时间' }]">
                    <a-range-picker v-model:value="activeState.time" />
                </a-form-item>
                <a-form-item label="活动类型" name="activitieType">
                    <a-select v-model:value="activeState.activitieType">
                        <a-select-option :value=0>通用</a-select-option>
                        <a-select-option :value=1>博学</a-select-option>
                        <a-select-option :value=2>笃行</a-select-option>
                        <a-select-option :value=3>尽美</a-select-option>
                        <a-select-option :value=4>明德</a-select-option>
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
                <a-form-item label="活动地点/活动链接" name="location">
                    <a-input v-model:value="activeState.activeAddress" placeholder="请输入活动地点/线上请输入链接" />
                </a-form-item>
                <a-form-item label="活动海报" name="activitieImgUrl">
                    <a-upload :custom-request="handleCustomUpload" v-model:file-list="fileList"
                        list-type="picture-card">
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