<template >
    <div class="confirm my-5">
        <img class="order-confirmed-icon" src="@/assets/img/icon/order-confirmed.svg">
        <h3 class="my-3">訂單已完成，感謝您的訂購</h3>
        <p>已收到您的款項，將為您安排商品出貨流程</p>
        <div class="btn-group my-5">
            <base-button class="go-to-homepage-btn btn--secondary py-2 me-5"
            @click="routerPush('')">
                前往首頁
            </base-button>
            <base-button class="go-shopping-btn btn--primary py-2"
            @click="routerPush('shop')">
                繼續購物
            </base-button>
        </div>
    </div>      
</template>

<script setup>
    import BaseButton from '@/components/BaseButton.vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const routerPush = (path) => {
        router.push(`/${path}`);
    }
</script>

<style lang="scss" scoped>
    .confirm{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .order-confirmed-icon{
        width: 100px;
    }
    .btn-group{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .go-to-homepage-btn, .go-shopping-btn{
        max-width: 250px;
    }
</style>