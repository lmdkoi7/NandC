<template>
    <div class="order-confirmation mt-5" v-for="item in order">   
        <div class="order-detail">
            <h5 class="mb-4">訂單資訊</h5>

            <div class="order-info" >
                <div class="order-info__number ">
                    <h6 class="order-info-title fw--bold mb-3 me-3">訂單編號</h6>
                    <h6>{{ item.id }}</h6>
                </div>

                <div class="order-info__date ">
                    <h6 class="order-info-title fw--bold mb-3 me-3">訂單日期</h6>
                    <h6>{{ dateConvert }}</h6>
                </div>

                <div class="order-info__name ">
                    <h6 class="order-info-title fw--bold mb-3 me-3">姓名</h6>
                    <h6>{{ item.user.name }}</h6>
                </div>

                <div class="order-info__address ">
                    <h6 class="order-info-title fw--bold mb-3 me-3">地址</h6>
                    <h6>{{ item.user.address }}</h6>
                </div>

                <div class="order-info__tel ">
                    <h6 class="order-info-title fw--bold mb-3 me-3">電話</h6>
                    <h6>{{ item.user.tel }}</h6>
                </div>

                <div class="order-info__email ">
                    <h6 class="order-info-title fw--bold mb-3 me-3">信箱</h6>
                    <h6>{{ item.user.email }}</h6>
                </div>

                <div class="order-info__total ">
                    <h6 class="order-info-title fw--bold mb-3 me-3">訂單金額</h6>
                    <h6>NT$ {{ item.total }}</h6>
                </div>

                <div class="order-info__payment-method ">
                    <h6 class="order-info-title fw--bold mb-3 me-3">付款狀態</h6>
                    <h6>{{ item.is_paid === false? '未付款' : '已付款' }}</h6>
                </div>

                <div class="order-info__remark ">
                    <h6 class="order-info-title fw--bold mb-3 me-3">訂單備註</h6>
                    <h6>{{ order.message? order.message: '(無)' }}</h6>
                </div>
            </div>
        </div>

        <div class="order-summary">
            <h5 class="mb-4">商品明細</h5>
            <div class="cart-item-group">
                <div class="cart-item py-3" v-for="i in productList" :key="i">
                    <img class="cart-item__image" :src="i.product.images[0].imageUrl">
                    <div class="cart-item__info ms-3">
                        <span class="cart-item__title fw--bold">{{ i.product.title }}</span>
                        <span class="mt-auto">
                            <i class="qty-icon bi bi-x-lg"></i>
                            {{ i.qty }}
                        </span>
                    </div>
                    <h6 class="mt-auto ms-auto">NT$ {{ i.total }}</h6>
                </div>
            </div>

            <div class="subtotal py-2">
                <span>小計</span>
                <span>NT$ {{ subtotalCal }}</span>
            </div>
            <div class="shipping-cost py-2">
                <span>運費</span>
                <span>NT$ {{  }}</span>
            </div>
            <div class="discount py-2" v-if="subtotalCal !== item.total">
                <span>折扣金額</span>
                <span>-NT$ {{ subtotalCal - item.total }}</span>
            </div>
            <div class="total py-2">
                <span>合計</span>
                <span>NT$ {{ item.total }}</span>
            </div>
        </div>

    
    </div>
    <div class="button-group my-5">
        <base-button class="place-order btn--primary py-2"
        @click="routerPush('check-out/order-confirmed')">
            前往付款
        </base-button>
    </div>              
</template>

<script setup>
    import axios from 'axios';
    import { useOrderInfoStore } from '@/stores/orderInfoStore';
    import BaseButton from '@/components/BaseButton.vue';
    import { useRouter, useRoute } from 'vue-router';
    import { computed, ref, onBeforeMount } from 'vue';
    

    const orderStore = useOrderInfoStore();
    const router = useRouter();
    const route = useRoute();
    
    const order = ref([]);
    const productList = ref([]);
    const getOrder = () => {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/order/${route.params.id}`;
        axios.get(api).then(res => {
            if(res.data.success){
                order.value.push(res.data.order);
                //將物件內屬性的值回傳成陣列
                productList.value = Object.values(res.data.order.products);
                console.log(productList.value);
            }
        })
    }

    const dateConvert = computed(() => {
        const date = new Date(order.value[0].create_at*1000);
        return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}  ${date.getHours()}:${date.getMinutes()}`;
    })

    const subtotalCal = computed(() => {
        let subtotal = 0;
        productList.value.forEach(i => {
            subtotal += i.total;
        })
        return subtotal;
    })


    const routerPush = (path) => {
        router.push(`/${path}`);
    }

    

    onBeforeMount(getOrder);
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
    .order-info__number, .order-info__date, .order-info__name, 
    .order-info__tel, .order-info__address, .order-info__total,
    .order-info__payment-method, .order-info__email, 
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
        justify-content: flex-end;
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
        .order-info__number, .order-info__date, .order-info__name, 
        .order-info__tel, .order-info__address, .order-info__total, 
        .order-info__payment-method, .order-info__email, 
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