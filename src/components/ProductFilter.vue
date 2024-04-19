<template>
    <div class="filter-wrap container row" :class="{'filer--active':isFilterOpen}">
        <div class="filter__top my-4">
            <h5 class="filter__title fw--bold ">篩選</h5>
            <icon-button class="filter__close-btn"
            @click="filterToggle(true)"
            btn-icon="bi bi-x-lg"
            btn-icon-size="25px"
            icon-stroke="0.2px"
            />
        </div>
        <div class="filter__price mb-4">
            <h6 class="mb-3 fw--bold">價格範圍</h6>
            <div class="slider text-dark">
                <div class="min-price">
                    <span>${{ filterData.minPrice }}</span>
                </div>
                
                <div class="max-price">
                    <span>${{ filterData.maxPrice }}</span>
                </div>  
            </div>
            <div class="price-range__slider">
                <input class="slider__min-thumb" 
                type="range"
                min="0"
                max="300"
                step="10"
                v-model="filterData.minPrice"
                ref="minInput"  
                @input="minInputEvent(minInput)"
                @change="priceFilter()"
                >                      
                <input class="slider__max-thumb" 
                type="range"
                min="0"
                max="300"
                step="10"
                v-model="filterData.maxPrice"
                ref="maxInput"
                @input="maxInputEvent(maxInput)"
                @change="priceFilter()"
                >
                <div class="slider__progress"></div>
            </div>     
        </div>
        <div class="filter__purpose mb-4">
            <h6 class="mb-3 fw--bold">用途</h6>
            <div class="purpose-checkbox">
                <div class="washing-body mb-2">
                    <input type="checkbox" 
                    id="washing-body"  
                    v-model="filterData.purpose"
                    value="washing-body"
                    >
                    <label class="ms-2" for="washing-body">洗身體</label>
                </div>
                <div class="washing-face mb-2">
                    <input type="checkbox" 
                    id="washing-face" 
                    v-model="filterData.purpose"
                    value="washing-face"
                    >
                    <label class="ms-2" for="washing-face">洗臉</label>
                </div>
                <div class="washing-hands mb-2">
                    <input type="checkbox" 
                    id="washing-hands" 
                    v-model="filterData.purpose"
                    value="washing-hands"
                    >
                    <label class="ms-2" for="washing-hands">洗手</label>
                </div>
                <div class="washing-clothes mb-2">
                    <input type="checkbox" 
                    id="washing-clothes" 
                    v-model="filterData.purpose"
                    value="washing-clothes"
                    >
                    <label class="ms-2" for="washing-clothes">清潔衣物</label>
                </div>
                <div class="washing-dishes">
                    <input type="checkbox" 
                    id="washing-dishes" 
                    v-model="filterData.purpose"
                    value="washing-dishes"
                    >
                    <label class="ms-2" for="washing-dishes">清潔碗盤</label>
                </div>
            </div>
        </div>
        <div class="filter__skin-type mb-4">
            <h6 class="mb-3 fw--bold">適用膚質</h6>
            <div class="skin-type-checkbox">
                <div class="dry-skin mb-2">
                    <input type="checkbox" 
                    id="dry"
                    v-model="filterData.skinType"
                    value="drySkin">
                    <label class="ms-2" for="dry">乾性肌膚</label>
                </div>
                <div class="oily-skin mb-2">
                    <input type="checkbox" 
                    id="oily"
                    v-model="filterData.skinType"
                    value="oilySkin">
                    <label class="ms-2" for="oily">油性肌膚</label>
                </div>
                <div class="neutral-skin mb-2">
                    <input type="checkbox" 
                    id="neutral"
                    v-model="filterData.skinType"
                    value="neturalSkin">
                    <label class="ms-2" for="neutral">中性肌膚</label>
                </div>
                <div class="combination-skin mb-2">
                    <input type="checkbox" 
                    id="combination"
                    v-model="filterData.skinType"
                    value="combinationSkin">
                    <label class="ms-2" for="combination">混合性肌膚</label>
                </div>
                <div class="sensitive-skin">
                    <input type="checkbox" 
                    id="sensitive"
                    v-model="filterData.skinType"
                    value="sensitiveSkin">
                    <label class="ms-2" for="sensitive">敏感性肌膚</label>
                </div>
            </div>
        </div>
        <div class="filter__benefits mb-4">
            <h6 class="mb-3 fw--bold">功效</h6>
            <div class="benefits-checkbox">
                <div class="moisturize mb-2">
                    <input type="checkbox" 
                    id="moisturize"
                    v-model="filterData.benefits"
                    value="moisturize">
                    <label class="ms-2" for="moisturize">保濕</label>
                </div>
                <div class="whitening mb-2">
                    <input type="checkbox" 
                    id="whitening"
                    v-model="filterData.benefits"
                    value="whitening">
                    <label class="ms-2" for="whitening">美白</label>
                </div>
                <div class="anti-aging mb-2">
                    <input type="checkbox" 
                    id="anti-aging"
                    v-model="filterData.benefits"
                    value="antiAging">
                    <label class="ms-2" for="anti-aging">抗老化</label>
                </div>
                <div class="antisepsis mb-2">
                    <input type="checkbox" 
                    id="antisepsis"
                    v-model="filterData.benefits"
                    value="antisepsis">
                    <label class="ms-2" for="antisepsis">抗菌</label>
                </div>
                <div class="fragrance mb-2">
                    <input type="checkbox" 
                    id="fragrance"
                    v-model="filterData.benefits"
                    value="fragrance">
                    <label class="ms-2" for="fragrance">香氛</label>
                </div>
                <div class="soothing">
                    <input type="checkbox" 
                    id="soothing"
                    v-model="filterData.benefits"
                    value="soothing">
                    <label class="ms-2" for="soothing">寧神</label>
                </div>
            </div>
        </div>
        <div class="filer__btn-group mb-3">
            <base-button class="py-1" @click="clearFilter">清除</base-button>
            <base-button class="py-1">篩選</base-button>
        </div>
    </div>
    <back-drop 
    ref="backDrop"
    @close-back-drop="filterToggle"/>
</template>

<script setup>
import BaseButton from './BaseButton.vue';
import IconButton from './IconButton.vue';
import BackDrop from './BackDrop.vue';
import { reactive, ref, watch } from 'vue';
import { useGetProductListStore } from '../stores/productListStore';

const store = useGetProductListStore();
const isFilterOpen = ref(false);
const backDrop = ref(null);
const filterToggle = () => {
    isFilterOpen.value =! isFilterOpen.value;
    backDrop.value.backDropToggle()
}
defineExpose({ filterToggle });

const filterData = reactive({
    minPrice: 0,
    maxPrice: 300,
    purpose: [],
    skinType: [],
    benefits: []
});

const minInput = ref(null);
const maxInput = ref(null);
const priceGap = 20;
const minInputEvent = (e)=>{
    filterData.minPrice = parseInt(filterData.minPrice);
    filterData.maxPrice = parseInt(filterData.maxPrice);
    if (filterData.maxPrice - filterData.minPrice < priceGap){
        filterData.minPrice = filterData.maxPrice - priceGap;
    } else {
        const progress = document.querySelector('.slider__progress');
        progress.style.left = `${parseInt(e.value) / 3}%`;
    }
};
const maxInputEvent= (e) => {
    filterData.minPrice=parseInt(filterData.minPrice);
    filterData.maxPrice=parseInt(filterData.maxPrice);
    if (filterData.maxPrice - filterData.minPrice < priceGap){
        filterData.maxPrice = filterData.minPrice + priceGap;
    } else {
        const progress=document.querySelector('.slider__progress');
        progress.style.right = `${(300 - parseInt(e.value)) / 3}%`;
    }
}

const clearFilter=()=>{
    filterData.minPrice = 0;
    filterData.maxPrice = 300;

    const progress = document.querySelector('.slider__progress');
    progress.style.left=`${parseInt(filterData.minPrice) / 3}%`;
    progress.style.right=`${(300 - parseInt(filterData.maxPrice = 300)) / 3}%`;

    filterData.benefits = [];
    filterData.purpose = [];
    filterData.skinType = [];
}

const priceFilter = () => {
    store.filteredProducts = store.products.filter(item => 
    filterData.minPrice <= item.price && item.price <= filterData.maxPrice);
};

</script>

<style lang="scss" scoped>
@import "@/assets/components/product-filter";
</style>