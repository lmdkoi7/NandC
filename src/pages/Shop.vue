<template>
    <div class="header-container container-xl mb-5">
        <div class="header">
            <div class="header__title">
                <div class="title mb-1">{{ headerTitle }}</div>
                <div class="sub-title">{{ headerSubtitle }}</div>
            </div>
            <img class="header-banner__img" 
            src="@/assets/img/shop-header.jpg" 
            alt="">
        </div>
    </div>
    <div class="container-xl">
        <div class="product-list-container">
            <product-filter ref="filter"
            @update-value="test"
            ></product-filter>
            <div class="product-card-wrap">
                <div class="product-card-wrap--top">
                    <div class="category ">
                        <button type="button" class="category-btn fw--bold p-2" 
                        :class="{ active : productCategory.crrCategory === item }"
                        v-for="item in productCategory.category"
                        @click="changeCategory(item)"
                        >{{ item }}</button>
                    </div>
                    <div class="mobile-filter mt-3">
                        <base-button class="filter-btn btn--secondary py-1" @click="filterOpen()">
                            <i class="bi bi-funnel me-1"></i>
                            篩選
                        </base-button>
                    </div>
                </div>
            <div class="product-card-wrap--bottom container row ">
                    <loading :active="isLoading"></loading>
                    <product-card
                    class="mb-5"
                    v-for="(item, index) in crrrentPage" 
                    :props-item="item"
                    :props-index="index"
                    :key="item.id"
                    />
                </div>
       
            </div>  
        </div>
    </div>
    <pagination class="mb-5"
    :pages="pagination"
    @previous-page="paginationToggle"
    @update-page="paginationToggle"
    @next-page="paginationToggle"
    />
</template>

<script setup>
import axios from 'axios';
import BaseButton from '@/components/BaseButton.vue';
import Pagination from '@/components/Pagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import ProductCard from '@/components/ProductCard.vue';
import { ref, reactive, onBeforeMount, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Loading from 'vue3-loading-overlay';

const router = useRouter();
const route =useRoute();
const isLoading = ref(false);
const filter = ref(null);




//api取得的所有商品資料
const productList = ref([]);
//當前分類的商品
const crrCategoryProducts = ref([]);
//要顯示在當前頁面的商品資料
const allPagesProducts = ref([]);

const productCategory = reactive({
    category: ['所有商品', '沐浴皂', '家事皂'],
    crrCategory: route.params.category? route.params.category : '所有商品' 
});
const pagination = reactive({});

const filterOpen = () => {
    filter.value.filterToggle();
}

const getProducts = async () => {
    isLoading.value = true;
    const api = `${ import.meta.env.VITE_APP_API }api/${ import.meta.env.VITE_APP_PATH }/products/all`;
    await axios.get(api).then(res => {
        productList.value = res.data.products;
    });

    crrCategoryProducts.value = productList.value;

    for (let i = 0; i < Math.ceil(productList.value.length / 10); i++) {
        allPagesProducts.value.push(productList.value.slice(i * 10 , i * 10 + 10));        
    }; 
    if (productList.value.length > 10){
        pagination.total_pages = Math.ceil(productList.value.length / 10);
        pagination.current_page = 1;
        pagination.has_pre = false;
        pagination.has_next = true;

    } else {
        pagination.total_pages = 1;
        pagination.current_page = 1;
        pagination.has_pre = false;
        pagination.has_next = false;
    }
    isLoading.value = false;
};

//監聽category，category改變後回傳對應類的商品，並作頁數處理
watch(() => productCategory.crrCategory, () => {
    if(productCategory.crrCategory !== '所有商品'){
        crrCategoryProducts.value = productList.value.filter(item => {
            return item.category === productCategory.crrCategory;
        })
    } else {
        crrCategoryProducts.value = productList.value;
    }
    allPagesProducts.value = [];
    for (let i = 0; i < Math.ceil(crrCategoryProducts.value.length / 10); i++) {
        allPagesProducts.value.push(crrCategoryProducts.value.slice(i * 10 , i * 10 + 10));        
    }; 
});

const crrrentPage = computed(() => {
    return allPagesProducts.value[pagination.current_page - 1]
});

const changeCategory = (category) => {
    if(category === '所有商品') {
        router.push(`/shop`);
        productCategory.crrCategory = '所有商品';
    } else {
        router.push(`/shop/${category}`);
        productCategory.crrCategory = category;
    };
    filter.value.clearFilter();
};

const headerTitle = computed(() => {
    if (productCategory.crrCategory === '所有商品') {
        return '手工皂系列';
    } else {
        return productCategory.crrCategory
    }
});
const headerSubtitle = computed(() => {
    if(productCategory.crrCategory === '所有商品'){
        return 'All Products';
    }
    if(productCategory.crrCategory === '沐浴皂'){
        return 'Bath Soap';
    };
    if(productCategory.crrCategory === '家事皂'){
        return 'Housework Soap';
    }
})

const paginationToggle = (page) =>{
    isLoading.value = true;
    //模擬載入時間
    setTimeout(() => {
        isLoading.value = false;
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        });
        pagination.current_page = page;
        if (pagination.current_page === pagination.total_pages) {
            pagination.has_next = false;
        } else {
            pagination.has_next = true
        }
        if (pagination.current_page == 1) {
            pagination.has_pre = false;
        } else {
            pagination.has_pre = true;
        }; 
    }, 500);

}

const test = (filterData) => {
    let filteredProducts = [];
    filteredProducts = crrCategoryProducts.value.filter(item => {
        return item.price >= filterData.minPrice && item.price <= filterData.maxPrice;
    });
    allPagesProducts.value = [];
    for (let i = 0; i < Math.ceil(filteredProducts.length / 10); i++) {
        allPagesProducts.value.push(filteredProducts.slice(i * 10 , i * 10 + 10));        
    }; 
}




onBeforeMount(getProducts);

</script>

<style lang="scss" scoped>
@import '@/assets/pages/shop';
</style>