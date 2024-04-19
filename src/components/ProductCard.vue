<template>
    <div class="product-card ">
        <div class="product-card_image">
            <button class="wishlist-btn me-2 mt-2" @click="addToWishList(props.propsItem)">
                <i class="wishlist-icon"
                :class="!props.propsItem.isAddToWishlist?'bi bi-suit-heart':'bi bi-suit-heart-fill'"
                ></i>
            </button>
            <div class="mobile-product-image__indicators" >
                <div class="indicator" :class="{'current-img': props.propsItem.crrImgIndex == 0}"></div>
                <div class="indicator" :class="{'current-img': props.propsItem.crrImgIndex == 1}"></div>
            </div>
                <span class="product-label" v-if="props.propsItem.label">
                    <span class=" px-2">{{ props.propsItem.label }}</span>
                </span>
                
                <a class="product-images rounded-2" 
                @click.prevent="getProductInfo(props.propsItem.id)" 
                @scroll="imgSlider(props.propsIndex , props.propsItem)"
                href="#"
                >
                <img class="img1" :src="props.propsItem.images[0].imageUrl" ref="img">
                <img class="img2" :src="props.propsItem.images[1].imageUrl" ref="img">
                </a>  
        </div>
        <p class="product-category text-info my-2">{{ props.propsItem.category }}</p>
        <div class="product-card_title mb-2">
            <a class="text-dark fw--bold" 
            href="#" 
            @click.prevent="getProductInfo(props.propsItem.id)" 
            >
            {{ props.propsItem.title }}</a>
            <button class=" mobile-wishlist-btn" @click="addToWishList(props.propsItem)">
                <i class="wishlist-icon"
                :class="!props.propsItem.isAddToWishlist?'bi bi-suit-heart':'bi bi-suit-heart-fill'"
                ></i>
            </button>
        </div>
                            
        <div>
            <span class="product-card_origin-price me-2" v-if="props.propsItem.origin_price!==props.propsItem.price">
                NT${{ props.propsItem.origin_price }}
            </span>
            <span class="product-card_price" 
            :class="{'discount':props.propsItem.origin_price!==props.propsItem.price}"
            >
                NT${{ props.propsItem.price }}/{{ props.propsItem.unit }}
            </span>
        </div>

        <div class="product-card_addtocart-btn mt-4">
            
            <base-button class="addtocart-btn py-2"
            @click="store.addToCart(props.propsItem.id,1)">
                <i class="cart-icon bi bi-cart3"></i>
                加入購物車
            </base-button>
        </div>       
    </div>
    
                    
</template>

<script setup>
    import BaseButton from '../components/BaseButton.vue';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useSideCartStore } from '../stores/sideCartStore';

    const router = useRouter();
    const store = useSideCartStore();
    const props = defineProps(['propsItem', 'propsIndex']);

    const getProductInfo = (id) => {
        router.push(`/product-detail/${id}`)
    };

    const addToWishList = (item) => {
        item.isAddToWishlist =! item.isAddToWishlist;
    };

    let timer;
    const img = ref(null);
    const imgSlider = (index, item) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            const sliderContainer = document.querySelectorAll('.product-images');
            const imgWidth = img.value.offsetWidth;
            const scrollX = Math.round(sliderContainer[index].scrollLeft);
            item.crrImgIndex = scrollX / imgWidth;  
        }, 200);
    };

</script>

<style lang = "scss" scoped>
   @import '@/assets/components/product-card';
</style>