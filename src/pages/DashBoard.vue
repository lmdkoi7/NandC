<template>
    <nav class="dashboard-header navbar">
        <ul class="navbar-logo navbar-nav col">
            <li class="hamburger-icon">
                <button type="button" class="nav-link" @click="sidebarMenuToggler">
                    <i :class="!sidebarOpen?'bi bi-list':'bi bi-x-lg'"></i>
                </button>
            </li>
            <li class="navbar-brand">
                <RouterLink to="" class="logo-link">
                    <img class="logo-img d-inline-block align-text-top" src="@/assets/img/icon/n&c.svg" alt="">
                    N&C 後台
                </RouterLink>
            </li> 
            <li class="logout-icon nav-item ">
                <a class="nav-link p-2" href="#" @click.prevent="logOut">
                    <i class="bi bi-box-arrow-right"></i>
                </a>
            </li> 
        </ul>

        <ul class="mobile-sidebar navbar-nav" :class="{'sidebar--active':sidebarOpen}">   
            <li class="product-list ">
                <RouterLink to="/dashboard/products" class="nav-link fw-bolder">
                    商品管理
                </RouterLink>
            </li>
            <li class="coupon-list ">
                <RouterLink to="/dashboard/coupon" class="nav-link fw-bolder">
                    優惠券
                </RouterLink>
            </li>
            <li class="order-list ">
                <RouterLink to="" class="nav-link fw-bolder">
                    訂單
                </RouterLink>
            </li> 
        </ul>
    </nav>

    <div class="dashboard-body ">
        <ul class="desktop-sidebar navbar-nav">   
            <li class=" px-5 py-1"
            :class="{'crr-page': route.path === '/dashboard/products'}"
            >
                <RouterLink to="/dashboard/products" 
                class="nav-link fw-bolder"
                
                @click="changePage('products')"
                >
                    商品管理
                </RouterLink>
            </li>
            <li class=" px-5 py-1" 
            :class="{'crr-page': route.path === '/dashboard/coupon'}"
            >
                <RouterLink to="/dashboard/coupon" 
                class="nav-link fw-bolder"              
                @click="changePage('coupon')"
                >
                    優惠券
                </RouterLink>
            </li>
            <li class=" px-5 py-1">
                <RouterLink to="" 
                class="nav-link fw-bolder"
                @click="changePage('order')"
                >
                    訂單
                </RouterLink>
            </li> 
        </ul>

        <div class="dashboard-body__content ">
            <loading-vue :active="isLoading" />
            <RouterView></RouterView>
        </div>
    </div>
    


</template>


<script setup>
import { ref, onBeforeMount} from 'vue';
import { useRouter, useRoute, RouterView } from 'vue-router';
import axios from 'axios';
import LoadingVue from 'vue3-loading-overlay';

const router = useRouter();
const route = useRoute();
const isLoading = ref(false);
const currentPage = ref({
    navbar: ['products', 'coupon', 'order'],
    crrPage: 'products'
})
const changePage = (pageName) => {
    currentPage.value.crrPage = pageName;
}

const sidebarOpen = ref(false);
const sidebarMenuToggler = () => {
    sidebarOpen.value = !sidebarOpen.value;
}

const logOut = () => {
    isLoading.value = true;
    const api = `${import.meta.env.VITE_APP_API}logout`;
    axios.post(api).then(res => {
        if(res.data.success){
            console.log(res);
            isLoading.value = false;
            router.push('/login');          
        }
    })
}

onBeforeMount(() => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    
    //驗證token是否還有效
    const api = `${import.meta.env.VITE_APP_API}api/user/check`;
    axios.post(api).then((res) => {
        console.log(res);
        if (!res.data.success) {
            alert('請重新登入');
            router.push('/login');
        }
    })
})

</script>

<style lang="scss" scoped>
@import '@/assets/pages/dash-board';
</style>