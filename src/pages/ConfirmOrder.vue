<template>
    <div class="order-confirmation">   
        <div class="order-detail">
            <h5 class="mb-4">訂單資訊</h5>

            <div class="order-info">
                <div class="order-info__name ">
                    <h6 class="order-info-title fw--bold mb-3 me-3">姓名</h6>
                    <h6>{{ orderStore.order.user.name }}</h6>
                </div>

                <div class="order-info__address ">
                    <h6 class="order-info-title fw--bold mb-3 me-3">地址</h6>
                    <h6>{{ orderStore.order.user.address }}</h6>
                </div>

                <div class="order-info__tel ">
                    <h6 class="order-info-title fw--bold mb-3 me-3">電話</h6>
                    <h6>{{ orderStore.order.user.tel }}</h6>
                </div>

                <div class="order-info__email ">
                    <h6 class="order-info-title fw--bold mb-3 me-3">信箱</h6>
                    <h6>{{ orderStore.order.user.email }}</h6>
                </div>

                <div class="order-info__total ">
                    <h6 class="order-info-title fw--bold mb-3 me-3">訂單金額</h6>
                    <h6>NT$ {{ cartStore.cartsFinalTotal + cartStore.cartsFee }}</h6>
                </div>

                <div class="order-info__payment-method ">
                    <h6 class="order-info-title fw--bold mb-3 me-3">付款方式</h6>
                    <h6>{{ paymentMethod }}</h6>
                </div>

                <div class="order-info__remark ">
                    <h6 class="order-info-title fw--bold mb-3 me-3">訂單備註</h6>
                    <h6>{{ orderStore.order.message }}</h6>
                </div>
            </div>
        </div>

        <div class="order-summary">
            <h5 class="mb-4">購物車</h5>
            <div class="cart-item-group">
                <div class="cart-item py-3" v-for="item in cartStore.cartItem" :key="item.id">
                    <img class="cart-item__image" :src="item.product.images[0].imageUrl">
                    <div class="cart-item__info ms-3">
                        <span class="cart-item__title fw--bold">{{ item.product.title }}</span>
                        <span class="mt-auto">
                            <i class="qty-icon bi bi-x-lg"></i>
                            {{ item.qty }}
                        </span>
                    </div>
                    <h6 class="mt-auto ms-auto">NT$ {{ item.total }}</h6>
                </div>
            </div>

            <div class="subtotal py-2">
                <span>小計</span>
                <span>NT$ {{ cartStore.cartsTotal }}</span>
            </div>
            <div class="shipping-cost py-2">
                <span>運費</span>
                <span>NT$ {{ cartStore.cartsFee }}</span>
            </div>
            <div class="discount py-2" v-if="cartStore.cartsTotal !== cartStore.cartsFinalTotal">
                <span>折扣金額</span>
                <span>-NT$ {{ cartStore.cartsTotal - cartStore.cartsFinalTotal }}</span>
            </div>
            <div class="total py-2">
                <span>合計</span>
                <span>NT$ {{ cartStore.cartsFinalTotal + cartStore.cartsFee }}</span>
            </div>
        </div>

    
    </div>
    <div class="button-group my-5">
        <base-button class="shipping-address btn--secondary py-2"
        @click="routerPush('check-out/order')">
            修改送貨資訊
        </base-button>
        <base-button class="place-order btn--primary py-2">
            送出訂單
        </base-button>
    </div>              
</template>

<script setup>
    import { useOrderInfoStore } from '@/stores/orderInfoStore';
    import { useCartStore } from '@/stores/cartStore';
    import BaseButton from '@/components/BaseButton.vue';
    import { useRouter } from 'vue-router';
    import { computed } from 'vue';

    const orderStore = useOrderInfoStore();
    const cartStore = useCartStore();
    const router = useRouter();
    
    const paymentMethod = computed(() => {
        if (orderStore.order.payment_method === 'credit_card') {
            return '信用卡付款'
        }
        if (orderStore.order.payment_method === 'ATM') {
            return 'ATM轉帳付款'
        }
        if (orderStore.order.payment_method === 'cash_on_delivery') {
            return '貨到付款'
        }
    })

    const routerPush = (path) => {
        router.push(`/${path}`);
    }
</script>

<style lang="scss" scoped>
    .order-confirmation{
        display: flex;
    }
    .order-detail{
        flex: 2;
        margin-right: 2rem;
    }
    .order-summary{
        flex: 1;
        min-width: 350px;
    }
    .order-info{
        display: flex;
        flex-wrap: wrap;
    }
    .order-info__name, .order-info__tel, .order-info__address, 
    .order-info__total, .order-info__payment-method, .order-info__email, 
    .order-info__remark{
        display: flex;
        flex-direction: column;
        width: 50%;
        padding-bottom: 3rem;
    }
    .order-info-title{
        width: 80PX;
        flex-shrink: 0;
    }
    .cart-item-group{
        max-height: 360px;
        overflow-y: auto;
    }
    .cart-item{
        height: 120px;
        display: flex;
        align-items: center;
        border-top: 1.5px solid $secondary;
    }
    .cart-item__image{
        height: 100%;
        width: auto;
    }
    .cart-item__info{
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .cart-item__title{
        font-size: 14px;
    }
    .qty-icon{
        font-size: 13px;
        -webkit-text-stroke-width: 0.3px;
    }
    .subtotal, .discount, .total, .shipping-cost{
        display: flex;
        justify-content: space-between;
    }
    .subtotal{
        border-top: 1.5px solid $secondary;
    }
    .discount{
        span{
            color: $danger;
        }
    }
    .total{
        font-size: 1.5rem;
    }
    .button-group{
        display: flex;
        justify-content: space-between;
    }
    .shipping-address, .place-order{
        max-width: 300px;
        width: 100%;
    }
    .shipping-address{
        margin-right: 10px;
    }
    .place-order{
        margin-left: 10px;
    }

    @include media-breakpoint-down(lg){
        .order-confirmation{
            flex-direction: column;
        }
        .order-detail{
            margin-right: 0;
            margin-bottom: 2.5rem;
        }
    }
    @include media-breakpoint-down(sm){
        .order-info__name, .order-info__tel, .order-info__address, 
        .order-info__total, .order-info__payment-method, .order-info__email, 
        .order-info__remark{
            flex-direction: row;
            width: 100%;
            padding-bottom: 1.5rem;
        }
        .button-group{
            flex-direction: column;
        }
        .shipping-address, .place-order{
            max-width: none;
            width: 100%;
            margin: 10px 0;
        }
    }
</style>