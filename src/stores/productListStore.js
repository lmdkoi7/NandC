import { defineStore } from "pinia";
import { ref } from "vue";

export const useGetProductListStore = defineStore('getProductList', () => {
    const products = ref({});
    const filteredProducts = ref({});

    return{
        products, filteredProducts 
    };
})