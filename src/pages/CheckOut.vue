<template>
    <div class="container-xl">
        <div class="step-progress m-5 pb-5">
            <div class="confirm-cart">
                <div class="step1 active">1</div>      
            </div>
            <div class="information">
                <div class="step2">2</div>             
            </div>
            <div class="confirm-order">
                <div class="step3">3</div>
            </div>
        </div>
        <RouterView></RouterView>
        <div class="d-flex my-5">
            <button class="btn--left" type="button" @click="">
                1
            </button>
            <button class="btn--right" type="button" @click="a">
                2
            </button>
        </div>

    </div>
</template>

<script setup>
    import { useRouter, useRoute } from 'vue-router';
    const router =useRouter();
    const route = useRoute();
    const id =1; 
    const a = () => {
        router.push({
            name: 'Order',
            query: {step: id}
        })
    }


</script>

<style lang="scss" scoped>
    @import '@/assets/pages/_check-out.scss';
</style>