<template>
    <div class="">
        <button class="icon-btn " type="button">
        <i 
        :class="btnIcon" 
        :style="{
            'font-size':btnIconSize,
            '-webkit-text-stroke':iconStroke,
            'color':iconColor
            }"
        ></i>
    </button>
    </div>
</template>
<style lang="scss" scoped>
@import '@/assets/components/icon-button.scss';
</style>
<script setup>
const props=defineProps(['btnIcon','btnIconSize','iconStroke','iconColor']);
</script>