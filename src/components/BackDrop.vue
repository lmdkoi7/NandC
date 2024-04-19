<template>
    <div class="back-drop" 
    @click="$emit('closeBackDrop')" 
    :class="{'back-drop--active':isOpen}"
    ></div>
</template>

<script setup>
import { ref } from 'vue';

const body = document.body;
const isOpen = ref(false);

const backDropToggle = () => {
    isOpen.value =! isOpen.value;
    if (isOpen.value) {
        body.classList.add('overflow-hidden');
    } else {
        body.classList.remove('overflow-hidden');
    }
}
defineEmits(['closeBackDrop'])
defineExpose({ backDropToggle });
</script>

<style lang="scss" scoped>
.back-drop{
    height: 100dvh;
    width: 100dvw;
    background-color: black;
    opacity: 0;
    z-index: 100;
    position: fixed;
    top: 0;
    transition: 0.4s;
    visibility: hidden;
}
.back-drop--active{
    visibility: visible;
    opacity: 0.5;
}
</style>