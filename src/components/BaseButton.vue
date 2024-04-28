<template>
   <button class="" :type="buttonType">
        <span class="btn__text">
            <slot></slot>
        </span>
    </button>
</template>

<style lang="scss" scoped>
@import "@/assets/components/button";
</style>

<script setup>
const props = defineProps({ buttonType: { type: String, default: "button" }});
</script>