<script setup lang="ts">
import dayjs from 'dayjs';
import { RouterLink, RouterView } from 'vue-router'
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
</script>

<template>
  <a-config-provider :locale=zhCN>
    <RouterView />
  </a-config-provider>
</template>

<style scoped>
</style>
