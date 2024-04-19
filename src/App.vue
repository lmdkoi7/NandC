<template>
  <RouterView v-if="isRouterAlive"/>
</template>

<style lang="scss">
  @import '@/assets/all.scss';

</style>
<script setup>
  import { RouterView } from 'vue-router';
  import { provide, ref } from 'vue';

  provide( 'reroad' , reroad );
  const isRouterAlive = ref(true);

  function reroad() {
    isRouterAlive.value = false;
  }
</script>