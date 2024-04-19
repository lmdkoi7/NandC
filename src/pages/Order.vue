<template>
    {{ route.query.step }}
</template>

<script setup>
import { useRoute } from 'vue-router';
const route =useRoute();
</script>