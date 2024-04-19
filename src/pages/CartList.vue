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
                            
                            <div class="product-title">
                                <img class="product-img me-3" :src="item.product.images[0].imageUrl" alt="">
                                <span class="fs--small fw--bold">{{ item.product.title }}</span>
                            </div>
                            <div class="product-price fs--small">NT${{ item.product.price }}</div>
                            <div class="product-qty">
                                <quantity-button
                                v-model="item.qty"
                                @update-cart="updateCart(item, index)"
                                />
                            </div>
                            <div class="product-total fs--small">NT${{ item.total }}</div>
                            <div class="product-delete">
                                <button class="delete-btn" type="button" @click="store.deleteCartItem(item)">
                                    <i class="bi bi-trash3"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="mobile-table-body">
                        <div class="mobile-cart-item" v-for="item in store.cartItem">
                            <div class="product-img">
                                <img class="product-img me-3" :src="item.product.images[0].imageUrl" alt="">
                            </div>
                            <div class="product-info">
                                <div class="product-info__top">
                                    <span class="fs--small fw--bold">{{ item.product.title }}</span>
                                    <button class="delete-btn" type="button" @click="store.deleteCartItem(item)">
                                        <i class="bi bi-trash3"></i>
                                    </button>
                                </div>
                                <div class="product-info__middle fs--small">NT${{ item.product.price }}/{{ item.product.unit }}</div>
                                <div class="product-info__bottom">
                                    <div class="product-total fs--small">NT${{ item.total }}</div>
                                    <quantity-button
                                    v-model="item.qty"
                                    @update-cart="updateCart(item)"
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
                    <span>NT${{ store.cartsTotal }}</span>
                </div>
                <div class="shipping-cost mb-3">
                    <span>運費</span>
                    <span>NT${{ store.cartsFee }}</span>
                </div>
                <div class="discount mb-3" v-if="store.cartsTotal !== store.cartsFinalTotal">
                    <span>優惠</span>
                    <span>-NT${{ store.cartsTotal - store.cartsFinalTotal }}</span>
                </div>
                <div class="coupon w-100">
                    <input class="coupon-input" type="text" v-model="coupon.code" 
                    placeholder="輸入優惠碼"
                    >
                    <button class="apply-btn" type="button" @click="applyCoupon()">套用</button>
                </div>
                <div class="total" :class="{'newTotal': store.cartsTotal !== store.cartsFinalTotal}">
                    <span>合計</span>
                    <span>NT${{ store.cartsFinalTotal + store.cartsFee }}</span>
                </div>
            </div>
        </div>

        
</template>

<style lang="scss" scoped>
@import '@/assets/pages/_cart-list.scss';
</style>

<script setup>
    import QuantityButton from '@/components/QuantityButton.vue';
    import BaseButton from '@/components/BaseButton.vue';
    import { useSideCartStore } from '@/stores/sideCartStore';
    import { RouterLink } from 'vue-router';
    import axios from 'axios';
    import { computed, ref } from 'vue';

    const store = useSideCartStore();

    const updateCart = (item) => {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart/${item.id}`;
        const cartItem = {
            product_id: item.product_id,
            qty: item.qty
        }
        axios.put(api,{ data: cartItem }).then((res) => {
            if (item.qty < 1) {
                store.deleteCartItem(item);
            }
            else {
                store.getCartItem();
            }
        })
    };

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
</script>