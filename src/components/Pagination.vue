<template>
    <div class="pagination-area">
        <ul class="pagination">
        <li class="previous mx-2" 
            :class="{'disable':pages.has_pre === false}"
        >
            <a class="previous-link" href="#" 
                @click.prevent="$emit('previousPage',pages.current_page - 1)"
            >
                <i class="previous-icon bi bi-arrow-left-short"></i>
            </a>
        </li>
        <li class="page mx-2" 
            :class="{'active':page === pages.current_page}" 
            v-for="page in pages.total_pages" :key="page"
        >
            <a class="page-link " href="#" 
                @click.prevent="$emit('updatePage',page)"
            >
            {{ page }}
            </a>
        </li>
        <li class="next mx-2"
            :class="{'disable':pages.has_next === false}"
        >
            <a class="next-link" href="#"
                @click.prevent="$emit('nextPage',pages.current_page + 1)"
            >
                <i class="next-icon bi bi-arrow-right-short"></i>
            </a>
        </li>
        </ul>
    </div>
    
</template>

<script setup>
const props = defineProps(['pages']);
defineEmits(['previousPage','updatePage','nextPage']);

</script>


<style lang="scss" scoped>
@import '@/assets/components/pagination';
</style>