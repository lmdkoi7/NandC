<template>
    <div class="base-modal__back-drop" 
    :class="{'base-modal__back-drop--active':baseModalActive}"
    ></div>
    <div class="base-modal p-3" :class="{'base-modal--active':baseModalActive}">
        <div class="modal-header">
            <h5 class="fw-bolder">{{ props.modalTitle }}</h5>
            <icon-button
            btn-icon="bi bi-x-lg"
            btn-icon-size="25px"
            icon-stroke="0.2px"
            @click="baseModalClose"
            />
        </div>
        <div class="modal-content py-4">
            <span>{{ props.modalContent }}</span>
        </div>
        <div class="modal-footer pt-3">
            <base-button class="modal-footer_btn  py-2 px-3 me-3" @click="baseModalClose">{{ props.modalLeftBtn }}</base-button>
            <base-button class="modal-footer_btn py-2 px-3" @click="$emit('baseModalBtn')">{{ props.modalRightBtn }}</base-button>
        </div>
    </div>
</template>

<script setup>
import IconButton from '@/components/IconButton.vue';
import BaseButton from '@/components/BaseButton.vue';
import { ref } from 'vue';


const props = defineProps(['modalTitle', 'modalContent', 'modalLeftBtn', 'modalRightBtn']);
const body = document.body;
const baseModalActive = ref(false);

const baseModalShow = () => {
    baseModalActive.value = true;
    body.classList.add('overflow-hidden');
}
const baseModalClose = () => {
    baseModalActive.value = false;
    body.classList.remove('overflow-hidden');
}
defineExpose({ baseModalShow, baseModalClose });
defineEmits(['baseModalBtn']);
</script>

<style lang="scss" scoped>
@import "@/assets/components/base-modal";
</style>