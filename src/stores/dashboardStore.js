import { defineStore } from "pinia";
import { ref } from "vue";

export const useDashboardStore = defineStore('dashboard', () => {
    const tempProduct = ref({});

    return{
        tempProduct
    };
});