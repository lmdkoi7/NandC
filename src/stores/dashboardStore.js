import { defineStore } from "pinia";
import { ref } from "vue";

export const useDashboardStore = defineStore('dashboard', () => {
    const tempProdut = ref({});

    return{
        tempProdut
    };
});