<template>
    <div class="d-flex my-5">
        <div class="cart-wrap">
            <div class="cart__header">
                <h4 class="cart-title ">購物車</h4>
                <span class="cart-qty">{{ store.cartQty }}</span>
            </div>
            <div class="cart__body">
                <div class="table-header">
                    <div class="product-name">商品名</div>
                    <div class="product-price">單價</div>
                    <div class="product-qty">數量</div>
                    <div class="product-total">小計</div>
                    <div class="product-delete"></div>
                </div>
                <div class="desktop-table-body">
                    <div class="desktop-cart-item" v-for="item, index in store.cartItem">
                        <loading-vue 
                        :active="store.updateItemId === item.product_id"
                        :height="30"
                        background-color="rgb(241, 236, 228)"
                        color="rgba(90, 70, 62, 1)"
                        :is-full-page="false"
                        />
                        <div class="product-title">
                            <img class="product-img me-3" :src="item.product.images[0].imageUrl" alt="">
                            <span class="fs--small fw--bold">{{ item.product.title }}</span>
                        </div>
                        <div class="product-price fs--small">NT${{ item.product.price }}</div>
                        <div class="product-qty">
                            <quantity-button
                            v-model="item.qty"
                            @update-cart="store.updateCart(item, item.product_id)"
                            />
                        </div>
                        <div class="product-total fs--small">NT${{ item.total }}</div>
                        <div class="product-delete">
                            <button class="delete-btn" type="button" @click="store.deleteCartItem(item, item.product_id)">
                                <i class="bi bi-trash3"></i>
                            </button>
                        </div>
                    </div>
                </div>

                    <div class="mobile-table-body">
                        <div class="mobile-cart-item" v-for="item in store.cartItem">
                            <loading-vue 
                            :active="store.updateItemId === item.product_id"
                            :height="30"
                            background-color="rgb(241, 236, 228)"
                            color="rgba(90, 70, 62, 1)"
                            :is-full-page="false"
                            />
                            <div class="product-img">
                                <img class="product-img me-3" :src="item.product.images[0].imageUrl" alt="">
                            </div>
                            <div class="product-info">
                                <div class="product-info__top">
                                    <span class="fs--small fw--bold">{{ item.product.title }}</span>
                                    <button class="delete-btn" type="button" @click="store.deleteCartItem(item, item.product_id)">
                                        <i class="bi bi-trash3"></i>
                                    </button>
                                </div>
                                <div class="product-info__middle fs--small">NT${{ item.product.price }}/{{ item.product.unit }}</div>
                                <div class="product-info__bottom">
                                    <div class="product-total fs--small">NT${{ item.total }}</div>
                                    <quantity-button
                                    v-model="item.qty"
                                    @update-cart="store.updateCart(item, item.product_id)"
                                    />
                                </div>
                            </div>                      
                        </div>
                    </div>

            </div>
        </div>

            <div class="summary">
                <h4 class="py-3">訂單資訊</h4>
                <div class="subtotal mb-3">
                    <span>小計</span>
                    <span>NT$ {{ store.cartsTotal }}</span>
                </div>
                <div class="shipping-cost mb-3">
                    <span>運費</span>
                    <span>NT$ {{ store.cartsFee }}</span>
                </div>
                <div class="discount mb-3" v-if="store.cartsTotal !== store.cartsFinalTotal">
                    <span>優惠</span>
                    <span>-NT$ {{ store.cartsTotal - store.cartsFinalTotal }}</span>
                </div>
                <div class="coupon w-100">
                    <input class="coupon-input" type="text" v-model="coupon.code" 
                    placeholder="輸入優惠碼"
                    >
                    <button class="apply-btn" type="button" @click="applyCoupon()">套用</button>
                </div>
                <div class="total">
                    <span>合計</span>
                    <span>NT$ {{ store.cartsFinalTotal + store.cartsFee }}</span>
                </div>
            </div>
    </div>

        <div class="button-group my-5">
            <base-button class="go-shopping-btn btn--secondary py-2 " @click="routerPush('shop')">
                繼續購物
            </base-button>
            <base-button class="check-out-btn btn--primary py-2 " @click="routerPush('check-out/order')">
                填寫寄送資訊
            </base-button>
        </div>
        
</template>

<style lang="scss" scoped>
@import '@/assets/pages/_cart-list.scss';
</style>

<script setup>
    import QuantityButton from '@/components/QuantityButton.vue';
    import BaseButton from '../components/BaseButton.vue';
    import { useCartStore } from '@/stores/cartStore';
    import { useRouter } from 'vue-router';
    import axios from 'axios';
    import { ref } from 'vue';
    import LoadingVue from 'vue3-loading-overlay';

    const store = useCartStore();
    const router = useRouter();

    const coupon = ref({
        code: ''
    });
    const applyCoupon = () => {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/coupon`;
        axios.post(api, { data: coupon.value }).then(res => {
            console.log(res.data);
            store.getCartItem();
        })
    }

    const routerPush = (path) => {
        router.push(`/${path}`);
    }

</script>