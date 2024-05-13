<template>
    <div class="carousel mb-5">
        <div class="carousel-item">
            <span class="title">
                <div class="title1 mb-3">最自然的原料</div>
                <div class="title2 mb-5">最舒適的沐浴體驗</div>
                <button class="btn py-2 px-4" type="button">Shop Now</button>
            </span>   
            <div class="mask"></div>
            <img src="@/assets/img/header.jpg" alt="">
        </div>
    </div>
    <div class="container-xl">
        <div class="product-feature my-5">
            <h4 class="mb-5 fw--bold">商品特色</h4>
            <div class="feature">
                <div class="feature1">
                    <img src="@/assets/img/icon/feature1.svg" alt="">
                    <span class="feature-title">使用天然原料製作</span>
                    <p>我們使用天然原料及天然精油。</p>
                </div>
                <div class="feature2">
                    <img src="@/assets/img/icon/feature2.svg" alt="">
                    <span class="feature-title">不含防腐劑</span>
                    <p>我們使用天然原料及天然精油。</p>
                </div>
                <div class="feature3">
                    <img src="@/assets/img/icon/feature3.svg" alt="">
                    <span class="feature-title">不使用動物實驗</span>
                    <p>我們使用天然原料及植物精油。</p>
                </div>
                <div class="feature4">
                    <img src="@/assets/img/icon/feature4.svg" alt="">
                    <span class="feature-title">不含人工色素</span>
                    <p>我們使用天然礦泥粉取代人工色素。</p>
                </div>
            </div>
        </div>

        <product-slider class="my-5"
        :product-data="newProducts"
        >
            <template v-slot:title>
                <h4 class="fw--bold">新品上市</h4>
            </template>
        </product-slider>

        <div class="my-5">
            <h4 class="fw--bold mb-3" >商品分類</h4>
            <div class="bath-soap">
                <img src="@/assets/img/macadamia-soap-skin-care-treatment.jpg" alt="">
                <img src="@/assets/img/lemon-soap.jpg" alt="">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/pages/home';

</style>

<script setup>
import ProductSlider from '@/components/ProductSlider.vue';
import axios from 'axios';
import { ref, onBeforeMount } from 'vue';

const newProducts = ref([]);
const getProductInfo = async () => {
    const api = `${ import.meta.env.VITE_APP_API }api/${ import.meta.env.VITE_APP_PATH }/products/all`;
    axios.get(api).then( res => {
        newProducts.value = res.data.products.filter(item => item.label);
    });   
};
console.log(import.meta.env.VITE_TEXT);
onBeforeMount(getProductInfo);
</script>
