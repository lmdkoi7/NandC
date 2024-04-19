<template>
    <Loading :active="isLoading"></Loading>
    <div class="product-page-container container-xl row " v-for="item in productData" :key="item.id">
        <div class="bread-crumb mt-4 mb-3">
            <RouterLink to="/">首頁</RouterLink>
            <span>></span>
            <RouterLink to="/shop">產品一覽</RouterLink>
            <span>></span>
            <span>{{ item.title }}</span>
        </div>

        <div class="desktop-product-image col-12 col-md-6 col-lg-6">
            <div class="desktop-product-image__preview rounded-2">
                <img :src= "item.images[ previewImg ].imageUrl " >
            </div>
            <div class="desktop-product-image__others-img ">
                <a class="others-img rounded-2 " href="#" 
                v-for="(img,index) in item.images"
                :class="{ active : previewImg === index }" 
                @click.prevent = "productImage(index)"
                >
                    <img :src = " img.imageUrl " >
                </a>
            </div>
        </div>

        <div class="mobile-product-image col-12">
            <div class="mobile-product-image__indicators" >
                <div class="indicator" :class="{'current-img':currentIndex==0}" ></div>
                <div class="indicator" :class="{'current-img':currentIndex==1}"></div>
            </div>
            <div class="mobile-product-image__preview rounded-2" @scroll="imgSlider">
                <img class="" :src="item.images[0].imageUrl" ref="img">
                <img class="" :src="item.images[1].imageUrl" ref="img">
            </div>
        </div>

        <div class="product-info col">
            <div class="product-label mb-2" v-if="item.label">
                <span>{{ item.label }}</span>
            </div>
            <div class="product-info__title mb-3">
                <h4 class="fw-bolder">{{ item.title }}</h4>
                <button class="wishlist-btn " @click="">
                    <i class="wishlist-icon bi bi-suit-heart"></i>
                </button>
            </div>

            <div class="product-info__description mb-auto" v-if="item.description">
                <template v-for="(i,index) in item.description.split('\n')" :key="index">
                    <ul class="description-ul">
                        <li class="description-li">{{ i }}</li>
                    </ul>
                </template>
            </div>
            <div class="product-card__price">
                <div>
                    <span class="origin-price me-2" v-if="item.origin_price!==item.price">
                        NT${{ item.origin_price }}
                    </span>
                    <h4 class="price" :class="{'discount':item.origin_price!==item.price}">
                        NT$ {{ item.price }}/{{ item.unit }}
                    </h4>
                </div>
                <span class="product-qty">庫存：{{ item.stock }}{{ item.unit }}</span>
            </div>
            
            <div class="add-to-cart">
                <div class="add-to-cart__quantity">
                    <div class="quantity-input ">
                        <quantity-button
                        v-model="item.qty"
                        />
                    </div>
                    <div class="add-to-cart__price">
                        <span>NT$ {{ item.price * item.qty }}</span>
                    </div>
                </div>
                <base-button 
                class="add-to-cart__btn py-2"
                @click="store.addToCart( item.id , item.qty)">
                    <i class=" bi bi-cart3"></i>
                        加入購物車
                </base-button>
            </div>
        </div>

        <div class="product-detail my-5">
            <div class="toggle-tab" >
                <div class="toggle-tab__btn">
                    <button class="btn--product-specification" 
                    type="button"
                    @click="toggleTab(false,'product-specification')"
                    :class="{'toggle-tab--active' : !isOrderNoteShow}"
                    >商品規格</button>
                    
                    <button class="btn--order-note" 
                    type="button "
                    @click="toggleTab(true,'order-note')"
                    :class="{'toggle-tab--active' : isOrderNoteShow }"
                    >訂購須知</button>
                </div>
                <div class="toggle-tab__underline"
                :style="{transform : translateX} "
                ></div>
            </div>
            <div class="product-detail__content ">
                <h4 class="product-specification pt-5">商品規格</h4>
                <h6>商品成分</h6>
                <p>{{ item.ingredient }}</p>
                <h6>商品用途</h6>
                <p>{{ item.usage }}</p>
                <h6>使用方式</h6>
                <p>{{ item.howToUse }}</p>
                <h6>適用對象</h6>
                <p>{{ item.targetAudience }}</p>
                <h6>保存期限</h6>
                <p>{{ item.shelfLife }}</p>
                <h6>保存方式</h6>
                <p>{{ item.preservation }}</p>
                <h6>注意事項</h6>
                <div v-if="item.notes">
                    <ol class="notes">
                        <template v-for="i,index in item.notes.split('\n')" :key="index">
                            <li>{{ i }}</li>
                        </template>
                    </ol>
                </div>
                <h4 class="order-note pt-5">訂購須知</h4>
            </div>
        </div>
        <product-slider :product-data="similarProducts.info">
            <template v-slot:title >
                <h4>相似商品</h4>
            </template>
        </product-slider>
        
    </div>
    <Footer></Footer>
</template>

<style lang="scss" scoped> 
    @import '@/assets/pages/product-page';
</style>

<script setup>
import axios from 'axios';
import { onBeforeMount, ref, reactive, inject } from 'vue';
import { useRoute, RouterLink, onBeforeRouteUpdate } from 'vue-router';
import BaseButton from '@/components/BaseButton.vue';
import QuantityButton from '../components/QuantityButton.vue';
import productSlider from '@/components/productSlider.vue';
import Footer from '@/layout/Footer.vue';
import { useSideCartStore } from '@/stores/sideCartStore.js';
import Loading from 'vue3-loading-overlay';

const isLoading = ref(false);
const route = useRoute();
const store = useSideCartStore();
const productData = reactive({});
const similarProducts = reactive({});
const previewImg = ref(0);

const getProductInfo = async () => {
    const productInfoApi = `${ import.meta.env.VITE_APP_API }api/${ import.meta.env.VITE_APP_PATH }/product/${ route.params.id }`;
    isLoading.value = true;
    await axios.get(productInfoApi)
    .then( res => {
        productData.info = res.data.product;
        productData.info.qty = 1; 
    }); 
    const api = `${ import.meta.env.VITE_APP_API }api/${ import.meta.env.VITE_APP_PATH }/products/all`;
    await axios.get(api).then( res => {
        similarProducts.info = res.data.products.filter(item => item.category === productData.info.category);
        isLoading.value = false;
    });   
};

const productImage = (index) => {
    previewImg.value = index;
}

const currentIndex = ref(0);
const img = ref(null);
let timer;
const imgSlider = () => {
    clearTimeout(timer);
    timer=setTimeout(() => {
        const sliderContainer=document.querySelector('.mobile-product-image__preview');
        const imgWidth=img.value[0].offsetWidth;
        const scrollX=Math.round(sliderContainer.scrollLeft);
        currentIndex.value=scrollX/imgWidth;
    },200);
};

const isOrderNoteShow=ref(false)
const translateX=ref('translateX(0)');
const toggleTab=(boolean,className)=>{
    isOrderNoteShow.value=boolean;
    const navbarHeight=document.querySelector('.navbar')
    const toggleTabHeight=document.querySelector('.toggle-tab')
    const toggleTabEl = document.querySelector(`.${className}`);
    window.scrollTo({
        top:toggleTabEl.offsetTop - navbarHeight.offsetHeight - toggleTabHeight.offsetHeight,
        behavior:'smooth'
    });
    
    if(boolean){
        translateX.value='translateX(100%)';
    }
    else{
        translateX.value='translateX(0)';
    }
};

onBeforeRouteUpdate(async (to, from)=>{
    if (to.params.id !== from.params.id) {
        const api = `${ import.meta.env.VITE_APP_API }api/${ import.meta.env.VITE_APP_PATH }/product/${ to.params.id }`;
        axios.get(api).then( res => {
            productData.info = res.data.product;
            productData.info.qty = 1; 
            //reload();
        });
    } 
});


onBeforeMount( getProductInfo );

</script>

