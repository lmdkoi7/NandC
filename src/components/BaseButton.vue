<template>
   <button class="base-btn " :type="buttonType">
        <span class="base-btn__text">
            <slot></slot>
        </span>
    </button>
</template>

<style lang="scss" scoped>
@import "@/assets/components/button";
</style>

<script setup>
const props=defineProps({buttonType:String});
</script>