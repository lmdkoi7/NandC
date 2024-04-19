<template>
    <span class="filter-label">
        <slot></slot>
        <button class="icon" @click="$emit('deleteLabel')">
            <i class="bi bi-x-lg"></i>
        </button>
    </span>
</template>

<style lang="scss" scoped>
.filter-label{
    font-size: 14px;
    display: inline-block;
    background-color: $primary;
    color: white;
    border-radius: 30px;
    padding: 5px 0px 5px 10px;
}
.icon{
    background: none;
    border: none;
    color: white;
    
}
</style>

<script setup>
defineEmits(['deleteLabel']);
</script>