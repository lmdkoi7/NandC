<template>
    <div class="product-slider mb-5">        
        <div class="product-slider__title mb-3">
            <button class="btn--pre " :class="{'disable': isFirstPage}"
            type="button" 
            @click="sliderControl(-1)">
                <i class="bi bi-chevron-left"></i>
            </button>
            <slot name="title">標題</slot>
            <button class="btn--next " :class="{'disable': islastPage}"
            type="button" 
            @click="sliderControl(1)">
                <i class="bi bi-chevron-right"></i>
            </button>
        </div>
        <div class="product-cards-wrap">
            <div class="product-cards" @scroll="scrollControl" ref="slider">
                <product-card 
                v-for="item,index in props.productData"
                :props-item="item"
                :props-index="index"
                :key="item.id"
                ref="productCard"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.product-slider {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0;
}
.product-slider__title{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.product-cards-wrap {
    width: 100%;
}
.btn--pre,.btn--next {
    font-size: 30px;
    color: $primary;
    transition: 0.3s;
    opacity: 1;
}
.disable{
    color: rgb(194, 188, 186);
    pointer-events: none;
    
}
@media (hover :hover){
    .btn--pre:hover{
        transform: translateX(-10px);
    }
    .btn--next:hover{
        transform: translateX(10px);
    }
}

.product-cards {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    &::-webkit-scrollbar{
        display: none;
    }
}
.product-card{
    scroll-snap-align: start;
}
@include media-breakpoint-up (xxl) {
    .product-card{
        flex: 0 0 auto;
        width: calc(100% / 4);   
        padding: 0 20px; 
    }
}
@include media-breakpoint-down (xxl) {
    .product-card{
        flex: 0 0 auto;
        width: calc(100% / 4);   
        padding: 0 15px;      
    }
}
@include media-breakpoint-down (lg) {
    .product-card{
        flex: 0 0 auto;
        width: calc(100% / 3);
    }
}
@include media-breakpoint-down (md) {
    .product-card{
        flex: 0 0 auto;
        width: 50%;
        
    }
    .btn--pre,.btn--next{
        font-size: 30px;
    }
}
@include media-breakpoint-down (sm) {
    .product-card{
        flex: 0 0 auto;
        width: 50%;
    }
}
</style>

<script setup>
    import ProductCard from '@/components/ProductCard.vue';
    import { ref, watchEffect } from 'vue';
    const props = defineProps(['productData']);
    
    const isFirstPage = ref(true);
    const islastPage = ref(false);

    const productCard = ref([]);
    const slider = ref(null);

    let productCardWidth = [];
    watchEffect(() => {
        if(slider.value && productCard.value){
            productCard.value.forEach(i=>{
                productCardWidth.push(i.$el);
                
            });

            if (slider.value.scrollWidth === slider.value.clientWidth){
                islastPage.value = true;
            }else{
                islastPage.value = false;
            }
        }
    })

    
    let sliderPage = 0;
    const sliderControl = (scrollDirection) => {
       
        if (sliderPage >= 0 ) {
            sliderPage += scrollDirection;
            const scrollAmount = productCardWidth[0].clientWidth * sliderPage + scrollDirection;
            
            slider.value.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    const scrollControl = () => {
        sliderPage = Math.round(slider.value.scrollLeft / productCardWidth[0].clientWidth) ;
        if (slider.value.scrollLeft === 0) {
            sliderPage = 0;
        }
        sliderPage === 0 ? isFirstPage.value = true : isFirstPage.value = false;
        const sliderColQty = Math.round(slider.value.clientWidth / productCardWidth[0].clientWidth);
        
        const maxScrollLeft = slider.value.scrollWidth - slider.value.clientWidth;
        if (slider.value.scrollLeft === maxScrollLeft) {
            sliderPage = productCardWidth.length - sliderColQty;
            
        }
        sliderPage === productCardWidth.length - sliderColQty ? islastPage.value = true : islastPage.value = false;
    }

    
   
</script>