<template>
    <div class="notice">
            輸入優惠碼【EGYUI112】即可享有全品項五折優惠!
    </div>
    <nav class=" desktop-header navbar navbar-expand-md ">
        <div class="container-xl">
            <ul class="header-menu--left navbar-nav col">
                <li class=" product">
                    <RouterLink to="/shop" class="nav-link fw--bold">產品一覽</RouterLink>
                </li>   
            </ul>
            <ul class="header-hamburger-menu navbar-nav col">
                <li class="hamburger-icon mx-2">
                    <button type="button" class="nav-link" @click="sidebarMenuToggler">
                        <i class="bi bi-list"></i>
                    </button>
                </li>

                <div class="header-sidebar-menu" :class="{'sidebar-menu--active':sidebarOpen}">   
                    <ul class="header-menu__drawer navbar-nav flex-column h-100 w-100 pt-2 pb-4 px-4">  
                        <button class="menu__close-btn mb-3" type="button" @click="sidebarMenuToggler">
                            <i class="close-btn__icon bi bi-x-lg"></i>
                        </button>
                        <div class="menu__search">
                            <i class="bi bi-search mx-1"></i>
                            <input type="text" class="me-2">
                        </div>
                        <div class="menu__link-product">
                            <li class=" nav-item my-3">
                            <RouterLink to="/shop" class="nav-link ">
                                <i class="product-icon bi bi-shop me-2"></i>
                                產品一覽
                            </RouterLink>
                            </li>
                        </div>
                        <div class="menu__link-wishlist">
                            <li class="wish-icon nav-item my-3">
                            <button type="button" class="nav-link ">
                                <i class="bi bi-suit-heart me-2"></i>
                                願望清單
                            </button>
                            </li>
                        </div>
                        <div class="menu__link-login">
                            <li class="login-icon nav-item my-3">
                            <RouterLink to="/login" class="nav-link ">
                                <i class="bi bi-person me-2"></i>
                                會員登入
                            </RouterLink>
                            </li>
                        </div>  
                    </ul>
                </div>
            </ul>
            <ul class="header-logo navbar-nav col">
                <li class="navbar-brand mx-auto">
                    <RouterLink to="/" class="logo-link">
                        <img class="logo-img d-inline-block align-text-top me-2" src="@/assets/img/icon/n&c.svg" alt="">
                        N&C
                    </RouterLink>
                </li> 
            </ul>
            <ul class="header-menu--right navbar-nav col">  
                <li class="search-icon nav-item me-2" >
                    <button type="button" class="nav-link">
                        <i class="bi bi-search "></i>
                    </button>
                </li>
                <li class="wish-icon nav-item mx-2">
                    <button type="button" class=" nav-link ">
                        <i class="bi bi-suit-heart"></i>
                    </button>
                </li>
                <li class="login-icon nav-item mx-2">
                    <RouterLink to="/login" class="nav-link ">
                        <i class="bi bi-person "></i>
                    </RouterLink>
                </li>
                <li class="cart-icon nav-item mx-2">
                    <side-cart/>        
                </li>               
            </ul>        
        </div>
    </nav>          
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { ref} from 'vue';
import sideCart from '@/components/SideCart.vue';

const sidebarOpen=ref(false);

const body=document.body;//js取得body元素
const sidebarMenuToggler=()=>{
    sidebarOpen.value=!sidebarOpen.value;
    if(sidebarOpen.value==true){
        body.classList.add('overflow-hidden');
    }
    else{
        body.classList.remove('overflow-hidden');
    }       
}
document.addEventListener('scroll',()=>{
    const navbar=document.querySelector('.navbar');
    if(window.scrollY>1){
        navbar.classList.add('scrolled');
    }
    else{
        navbar.classList.remove('scrolled');
    }
    
});


</script>

<style lang="scss" scoped>
@import '@/assets/layout/navbar.scss';

</style>

