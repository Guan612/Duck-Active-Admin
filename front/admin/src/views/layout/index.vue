<script setup>
import Headerbar from './components/headerbar.vue';
import Siderbar from './components/siderbar.vue';
</script>

<template>
<div class="flex flex-row h-screen">
    <Siderbar class="w-1/12"></Siderbar>
    <div class="flex flex-col w-11/12">
        <Headerbar></Headerbar>
        <RouterView class=""></RouterView>
    </div>
</div>
</template>

<style scoped>

</style>