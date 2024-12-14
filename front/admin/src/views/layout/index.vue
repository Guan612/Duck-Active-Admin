<script setup>
import Headerbar from './components/headerbar.vue';
</script>

<template>
    <div class="flex flex-col h-full">
        <Headerbar></Headerbar>
        <RouterView></RouterView>
    </div>
</template>

<style scoped></style>