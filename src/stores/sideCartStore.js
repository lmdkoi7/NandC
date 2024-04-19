import { defineStore } from "pinia";
import { ref, watch } from "vue";
import axios from "axios";

export const useSideCartStore = defineStore('sideCart',()=>{
    const cartItem = ref({});
    const cartQty = ref(0);
    const cartsTotal = ref(0);
    const cartsFinalTotal = ref(0);
    const cartsFee = ref(0);

    watch(() => cartItem.value,()=>{
        if(cartItem.value.length > 0){
            cartsFee.value = 60;
        }else{
            cartsFee.value = 0;
        }
    })



    const getCartItem=()=>{
        const api = `${ import.meta.env.VITE_APP_API }api/${ import.meta.env.VITE_APP_PATH }/cart`;
        cartQty.value = 0;
        axios.get(api).then( res => {
            console.log(res.data.data);
            cartItem.value = res.data.data.carts;
            cartItem.value.forEach((item) => cartQty.value += item.qty);
            cartsTotal.value = Math.floor(res.data.data.total);
            cartsFinalTotal.value = Math.floor(res.data.data.final_total);
        })
    };

    const openSideCart=()=>{
        const body=document.body;//js取得body元素
        const sideCart=document.querySelector('.side-cart');
        const backDrop=document.querySelector('.side-cart__back-drop');
        sideCart.classList.add('side-cart--active');
        backDrop.classList.add('back-drop--active');
        body.classList.add('overflow-hidden');
    };

    const closeSideCart=()=>{
        const body=document.body;//js取得body元素
        const sideCart=document.querySelector('.side-cart');
        const backDrop=document.querySelector('.side-cart__back-drop');
        sideCart.classList.remove('side-cart--active');
        backDrop.classList.remove('back-drop--active');
        body.classList.remove('overflow-hidden');
    };
    
    const addToCart=(id,productQty=1)=>{
        const api=`${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart`;
        const cart=ref({
             product_id:id,
             qty:productQty 
        })
        axios.post(api,{ data:cart.value })
        .then( res => {
            console.log( res.data );
            getCartItem();
            openSideCart()
        })
    };

    const deleteCartItem=(item)=>{
        const api=`${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart/${item.id}`;
        axios.delete(api).then((res)=>{
            getCartItem();
            console.log(res);
        })
    }

    const deleteCarts=()=>{
        const api=`${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/carts`;
        axios.delete(api).then(res=>console.log(res));
    };

    return{
        cartItem, cartQty ,cartsFee, cartsTotal, cartsFinalTotal,
        getCartItem,
        openSideCart,
        addToCart,
        deleteCartItem,
        deleteCarts,
        closeSideCart
    };
});
