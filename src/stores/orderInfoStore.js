import { defineStore } from "pinia";
import { reactive } from "vue";

export const useOrderInfoStore = defineStore('orderInfo', () => {
    const order = reactive({ user: {}, message: '' });
    

    return{
        order
    };
})