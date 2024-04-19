<template>
<navbar></navbar>
<div class="userboard-container ">
    <router-view/>
</div>
<Footer></Footer>
</template>
<script setup>
import { RouterView } from 'vue-router';
import Navbar from '../layout/Navbar.vue';
import Footer from '../layout/Footer.vue';
</script>

<style lang="scss" scoped>

</style>