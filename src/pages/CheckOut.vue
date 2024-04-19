<template>
    <div class="container-xl">
        <div class="step-progress m-5 pb-5">
            <div class="confirm-cart active">
                <div class="step1 ">1</div>      
            </div>
            <div class="information" :class="{active: route.path === '/check-out/order'}">
                <div class="step2" >2</div>             
            </div>
            <div class="confirm-order">
                <div class="step3">3</div>
            </div>
        </div>
        <RouterView></RouterView>
        <div class="d-flex my-5">
            <button class="btn--left" type="button" @click="">
                返回
            </button>
            <button class="btn--right" type="button" @click="a">
                結帳
            </button>
        </div>

    </div>
</template>

<script setup>
    import { useRouter, useRoute } from 'vue-router';
    const router =useRouter();
    const route = useRoute();

    const a = () => {
        router.push('/check-out/order')
    }


</script>

<style lang="scss" scoped>
    @import '@/assets/pages/_check-out.scss';
</style>