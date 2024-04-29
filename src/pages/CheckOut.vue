<template>
    <div class="container-xl">
        <div class="step-progress-wrap mx-4">
            <div class="step-progress my-5">
                <div class="step" v-for="(item, index) in stepProgress.step" :key="index"
                :class="{ active: stepProgress.crrIndex > index || stepProgress.crrIndex === index }">
                    {{ index + 1 }}
                    <span>{{ item }}</span>
                </div>
                <div class="step-progress__line">
                    <div :style="lineStyle"></div>
                </div>
            </div>
        </div>
    
        <RouterView></RouterView>
    </div>
</template>

<script setup>
    import { useRoute } from 'vue-router';
    import { reactive, computed } from 'vue';
    const route = useRoute();

    const stepProgress = reactive({
        step: ['購物車', '填寫訂單資訊', '確認付款', '訂單完成'],
        crrIndex: 0
    });
    const lineStyle = computed(() => {
        return `transform: scaleX(${ 100 / 3 * ( stepProgress.crrIndex ) }%)`;
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/pages/_check-out.scss';
</style>