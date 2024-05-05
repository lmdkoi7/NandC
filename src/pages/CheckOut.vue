<template>
    <div class="container-xl">
        <div class="step-progress-wrap m-4">
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
    
        <RouterView v-slot="{ Component }">
            <Transition name="fade">
                <component :is="Component"/>
            </Transition>
        </RouterView>
    </div>
</template>

<style lang="scss" scoped>
    @import '@/assets/pages/_check-out.scss';
</style>

<script setup>
    import { useRoute } from 'vue-router';
    import { reactive, computed, watch } from 'vue';
    const route = useRoute();

    const crrIndexCal = computed(() => {
        if (route.path === '/carts') {
           return 0
        }
        if (route.path === '/order') {
           return 1
        }
        if (route.path === `/check-out/${route.params.id}`) {
           return 2
        }
        else {
            return 3
        }
    })
    const stepProgress = reactive({
        step: ['購物車', '填寫訂單資訊', '確認付款', '訂單完成'],
        crrIndex: crrIndexCal
    });

    

    const lineStyle = computed(() => {
        return `transform: scaleX(${ 100 / 3 * ( stepProgress.crrIndex ) }%)`;
    })
</script>
