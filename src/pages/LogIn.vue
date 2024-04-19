<template>
    <loading :active="isLoading"></loading>
    <div class="login" >
        <div class="login-form">
            <form @submit.prevent="signIn">
                <h2 class="form__tittle mb-4 text-dark text-center">會員登入</h2>
                <div class="form__input">
                    <h5 class="text-primary">帳號</h5>
                    <div class="form__input-username mb-4">
                        <input type="email" placeholder="請輸入帳號或電子郵件" v-model="user.username" required>
                        <div class="underline"></div>
                    </div>
                    <h5 class="text-primary">密碼</h5>
                    <div class="form__input-password mb-2">
                        <input :type="inputType" placeholder="請輸入密碼" v-model="user.password" required>
                        <div class="underline"></div>
                        <i class="bi bi-eye-slash" v-show="hidePassword" @click="passwordToggle"></i>
                        <i class="bi bi-eye" v-show="!hidePassword" @click="passwordToggle"></i>
                    </div>
                    <a href="#/login" class="d-inline-block mb-5">忘記密碼?</a>
                </div>
                        
                <div class="form__submit d-flex flex-column align-items-center w-100">
                    <base-button button-type="submit" class="form__submit-btn mb-2 py-2">
                        登入
                    </base-button>
                    <div class="form__submit-checkbox d-inline-block">
                        <input type="checkbox" name="" id="keep-login">
                        <label for="keep-login" class="ms-1">保持登入狀態</label>                        
                    </div>
                </div>  
            </form>
            
        </div>  
        <div class="login-img">
            
            <div class="login-img--left">
                <img src="../assets/img/login-img.jpg" alt="">
            </div>
            <div class="login-img_text"> 
                <span id="and">&</span>
            </div>
            <div class="login-img--right">
                <img src="../assets/img/login-img2.jpg" alt="">
            </div>
            <div class="login-img--mobile">
                <img src="../assets/img/mobile-login-img.jpg" alt="">
            </div>
        </div>
    </div>   
    <div class="footer"></div>
</template>

<style lang="scss" scoped>
@import "@/assets/pages/login.scss";

</style>
<script setup>
import BaseButton from "@/components/BaseButton.vue";
import Navbar from '@/layout/Navbar.vue';

import axios from "axios";
import { ref,reactive } from "vue";
import { useRouter } from "vue-router";
import Loading from 'vue3-loading-overlay';

const isLoading=ref(false);
const router=useRouter();
const user=reactive({
    username:'',
    password:''
})
const inputType=ref('password');
const hidePassword=ref(true);
const passwordToggle=()=>{
    hidePassword.value=!hidePassword.value;
    if(hidePassword.value===false){
        inputType.value='text';
    }
    else{
        inputType.value='password';
    }
};


const signInSuccess=()=>{
    router.push('/dashboard');
}
const signIn=()=>{
    const api=`${import.meta.env.VITE_APP_API}admin/signin`;
    isLoading.value=true;
    axios.post(api,user)
    .then((res)=>{
        isLoading.value=false;
        if(res.data.success){
            const token= res.data.token;
            const expired=res.data.expired;
            document.cookie=`hexToken=${token};expires=${new Date(expired)}`;
            signInSuccess();
        }  
    });
}

</script> 