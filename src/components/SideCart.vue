<template>
    <button type="button" class="cart-btn nav-link" @click = " store.openSideCart() ">
        <div class="quantity-icon" v-show = " store.cartQty > 0 ">
            <span class=" fw--bold">{{ store.cartQty }}</span>
        </div> 
        <i class="cart-icon bi bi-cart3 "></i>
    </button> 
                    
    <div class="side-cart">
        <div class="side-cart__top py-2 mx-4">
            <h4 class="side-cart__top-title fw--bold">購物車</h4>
            <span class="side-cart__top-qty me-auto ms-2 fw--bold">
                {{ store.cartQty }}
            </span>
            <icon-button 
            class="btn--close"
            btn-icon="bi bi-x-lg"
            btn-icon-size="25px"
            icon-stroke="0.2px"
            @click="store.closeSideCart()"
            ></icon-button>
        </div>  

        <div class="side-cart__content ">
           <transition name="empty-cart">
                <div class="is-cart-empty" v-show="store.cartItem == false">
                    <span class="icon-group">
                        <span class="icon1"></span>
                        <span class="icon2"></span>
                        <span class="icon3"></span>
                    </span>
                    <i class="cart-icon bi bi-cart3"></i>
                    <span class="fw--bold">購物車是空的</span>
                </div>
           </transition>

            <transition-group
            name="item"
            tag="ul"
            >
                <div class="cart-item my-3 py-2" v-for="(item, index) in store.cartItem" :key="item.product_id">
                    <loading-vue 
                    :active="store.updateItemId === item.product_id"
                    :height="30"
                    background-color="rgb(241, 236, 228)"
                    color="rgba(90, 70, 62, 1)"
                    :is-full-page="false"
                    />
                    <div class="cart-item_img">
                        <img :src="item.product.images[0].imageUrl" >
                    </div>
                    <div class="cart-item_info ms-3">
                        <div class="cart-item_info--top">
                            <span class="item-info_name fw--bold fs--small">{{ item.product.title }}</span>
                            <icon-button
                            class="item-info_delete-btn"
                            btn-icon="bi bi-trash3"
                            btn-icon-size="16px"
                            @click="store.deleteCartItem(item, item.product_id)"
                            />
                        </div>
                        <div class="cart-item_info--middle mb-auto">
                            <span class="item-info_origin-price ">NT${{ item.product.price }}/個</span>
                        </div>
                        <div class="cart-item_info--bottom">               
                            <span>NT${{ item.total }}</span>              
                            <div class="item-info_item-quantity">
                                <quantity-button
                                v-model="item.qty"
                                @update-cart="store.updateCart(item, item.product_id)"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </transition-group>     

        </div>
            <div class="side-cart__bottom p-4">
                <div class="subtotal mb-2">
                    <span class="">小計</span>
                    <span>{{ $filter.currency(store.cartsTotal) }}</span>
                </div>
                <div class="shipping-cost mb-2">
                    <span class="">運費</span>
                    <span>{{ store.cartsFee }}</span>
                </div>
                <div class="total mb-3">
                    <span class="fs-4">合計</span>
                    <span class="fs-4">NT${{ $filter.currency(totalCal) }}</span>
                </div>
                <base-button class="py-2" @click="checkOut">結帳</base-button>
            </div>
    </div> 
    <div class="side-cart__back-drop" @click="store.closeSideCart()"></div>
</template>


<script setup>
import axios from 'axios';
import IconButton from '@/components/IconButton.vue';
import QuantityButton from './QuantityButton.vue';
import BaseButton from '@/components/BaseButton.vue';
import { onBeforeMount, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSideCartStore } from '@/stores/sideCartStore.js';
import LoadingVue from 'vue3-loading-overlay';

const router = useRouter();
const store = useSideCartStore();


const totalCal = computed(() => {
    return store.cartsFee + store.cartsTotal;
})
const checkOut = () => {
    router.push('/check-out');
    store.closeSideCart();
};
onBeforeMount(store.getCartItem);
</script>

<style lang="scss" scoped>
@import "@/assets/components/side-cart.scss";
</style>