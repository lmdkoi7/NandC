<template>
    <div class="container-xl">
        <div class="step-progress m-5 pb-5">
            <div class="confirm-cart active">
                <div class="step1">1</div>      
            </div>
            <div class="information" 
            :class="{ active: route.path === '/check-out/order' || route.path === `/check-out/place-order/${route.params.id}`}"
            >
                <div class="progress-line"></div>
                <div class="step2">2</div>             
            </div>
            <div class="payment" :class="{ active: route.path === `/check-out/place-order/${route.params.id}`}">
                <div class="progress-line"></div>   
                <div class="step3">3</div>
            </div>
            <div class="order-confirmed" >
                <div class="progress-line"></div>   
                <div class="step4">4</div>
            </div>
        </div>
        <RouterView></RouterView>
    </div>
</template>

<script setup>
    import { useRoute } from 'vue-router';
    const route = useRoute();

</script>

<style lang="scss" scoped>
    @import '@/assets/pages/_check-out.scss';
</style>