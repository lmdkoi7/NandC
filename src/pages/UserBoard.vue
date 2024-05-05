<template>
    <div class="userboard-container">
        <navbar></navbar>
        <router-view/>
        <Footer></Footer>
    </div>
    </template>
<script setup>
    import { RouterView } from 'vue-router';
    import Navbar from '../layout/Navbar.vue';
    import Footer from '../layout/Footer.vue';
</script>

<style lang="scss" scoped>
    .userboard-container{
        
        
    }
</style>