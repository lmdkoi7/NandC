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
            <div class="product-cards" @scroll="scrollControl">
                <product-card 
                v-for="item,index in props.productData"
                :props-item="item"
                :props-index="index"
                :key="item.id"
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
    font-size: 35px;
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
    import { ref, onMounted } from 'vue';
    const props = defineProps(['productData']);

    const slider = document.getElementsByClassName('product-cards');
    const productCard = document.getElementsByClassName('product-card');
    
    const isFirstPage = ref(true);
    const islastPage = ref(false);

    let sliderPage = 0;
    const sliderControl = (scrollDirection) => {
        //const maxScrollLeft = slider[0].scrollWidth - slider[0].clientWidth;
        if (sliderPage >= 0 ) {
            sliderPage += scrollDirection;
            const scrollAmount = productCard[0].clientWidth * sliderPage + scrollDirection;
            slider[0].scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
            
            //console.log(`productCard clientWidth: ${productCard[0].clientWidth}, sliderPage: ${sliderPage}, scrollAmoint: ${scrollAmount}`);
        }
    }

    const scrollControl = () => {
        sliderPage = Math.round(slider[0].scrollLeft / productCard[0].clientWidth) ;
        //console.log(sliderPage);

        if (slider[0].scrollLeft === 0) {
            sliderPage = 0;
        }
        sliderPage === 0 ? isFirstPage.value = true : isFirstPage.value = false;
        const sliderColQty = Math.round(slider[0].clientWidth / productCard[0].clientWidth);
       
        const maxScrollLeft = slider[0].scrollWidth - slider[0].clientWidth;
        if (slider[0].scrollLeft === maxScrollLeft) {
            sliderPage = productCard.length - sliderColQty;
        }
        sliderPage === productCard.length - sliderColQty ? islastPage.value = true : islastPage.value = false;
    }
   
</script>