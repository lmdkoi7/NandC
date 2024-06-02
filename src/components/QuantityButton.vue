<template>
    <div class="quantity-btn">
        <button class="minus-btn" type="button" @click="decrease()">
            <i class="minus-btn__icon bi bi-dash-lg"></i>
        </button>
        <input type="number" class="quantity-input"
        ref="input"
        :value="props.modelValue"
        @input="$emit('update:modelValue', parseInt($event.target.value, 10))"
        @change="$emit('updateCart')"
        >
        <button class="plus-btn" type="button" @click="increase()">
            <i class="plus-btn__icon bi bi-plus-lg"></i>
        </button>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const input = ref(null)
    const props = defineProps(['modelValue']);
    defineEmits(['update:modelValue', 'updateCart']);
    const inputEvent = new Event('input');
    const changeEvent = new Event('change');
    const increase = () => {
        if (input.value.value >= 1) {
            input.value.value = parseInt(input.value.value, 10) + 1;
            input.value.dispatchEvent(inputEvent);
            input.value.dispatchEvent(changeEvent); 
        }
    };
    const decrease = () => {
        if (input.value.value > 1) {
            input.value.value = parseInt(input.value.value, 10
        ) - 1;
            input.value.dispatchEvent(inputEvent);
            input.value.dispatchEvent(changeEvent);
        }
    };
    
</script>

<style lang="scss" scoped>
.quantity-btn{
    display: flex;
    width: 100px;
    justify-content: space-between;
    align-items: center;
}
.minus-btn, .plus-btn{
    font-size: 18px;
    color: $primary;
    border: 1.5px solid $primary;
    border-radius: 30px;
    height: 27px;
    aspect-ratio: 1 / 1;
    transition: .3s;
    &:active{
        background-color: $primary;
        color: white;
    }
}


@media(hover :hover){
    .minus-btn, .plus-btn{
        &:hover{
            background-color: $primary;
            color: white;
        }
    }
}
.minus-btn__icon, .plus-btn__icon{
    position: relative;
    bottom: 3px;
    right: 3px;
}
.quantity-input{
    width: 30px;
    color: $dark;
    text-align: center;
    background: none;
    border: none;
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button{
        -webkit-appearance: none;
        margin: 0;
    }
    &::-ms-clear{
        display: none;
    }
    &:focus{
        outline: none;
    }
}
</style>