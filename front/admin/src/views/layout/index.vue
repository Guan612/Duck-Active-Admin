<script setup lang="ts">
import Headerbar from './components/headerbar.vue';
import Siderbar from './components/siderbar.vue';

</script>
<template>
    <div class="flex flex-col">
        <Headerbar></Headerbar>
        <div class="flex flex-row h-screen">
            <Siderbar></Siderbar>
            <router-view></router-view>
        </div>
    </div>
</template>