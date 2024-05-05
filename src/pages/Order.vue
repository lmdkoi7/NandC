<template>
    <form class="check-out-form mt-5" autocomplete="off"  @submit.prevent="placeOrder">
        <h5 class="mb-4">送貨資訊</h5>

        <div class="shipping-adress mb-5">
            <div class="name mb-4">
                <h6 class="d-inline-block mb-2">收件人</h6>
                <span class="required">*</span>
                <input class="input-field " type="text" name="name" v-model="order.user.name" required>
            </div>
            <div class="address mb-4">
                <h6 class="d-inline-block mb-2">收件地址</h6>
                <span class="required">*</span>
                <input class="input-field" type="text" name="address" v-model="order.user.address" required>
            </div>
            <div class="tel mb-4">
                <h6 class="d-inline-block mb-2">電話</h6>
                <span class="required">*</span>
                <input class="input-field" type="tel" name="tel"  required
                pattern="(\d{2,3}-?|\(\d{2,3}\))\d{3,4}-?\d{4}|09\d{2}(\d{6}|-\d{3}-\d{3})"
                v-model="order.user.tel"
                ref="telInput"
                @input="inputEvent">
                <span class="invalid" v-if="telInputCheck">請輸入正確的電話或手機格式</span>
            </div>
            <div class="email mb-4">
                <h6 class="d-inline-block mb-2">信箱</h6>
                <span class="required">*</span>
                <input class="input-field" type="email" name="email" v-model="order.user.email" required>
            </div>
            <div class="remark">
                <h6 class="mb-2">訂單備註</h6>
                <textarea class="input-field" rows="5" v-model="order.message"></textarea>
            </div>
        </div>
        <h5 class="mb-4">付款方式</h5>
        <div class="payment-method">
            <label class="mb-4 me-5">
                <input type="radio" value="credit_card" name="payment-method" v-model="order.payment_method" required>
                <span class="ps-2">信用卡</span>
            </label>
            <label class="mb-4 me-5">
                <input type="radio" value="ATM" name="payment-method" v-model="order.payment_method" required>
                <span class="ps-2">ATM轉帳</span>
            </label>
            <label class="mb-4">
                <input type="radio" value="cash_on_delivery" name="payment-method" v-model="order.payment_method" required>
                <span class="ps-2">貨到付款</span>
            </label>
        </div>
        <div class="button-group my-5">
            <base-button class="return-cart-list btn--secondary py-2"
            @click="routerPush('carts')">
                返回購物車
            </base-button>

            <base-button class="confirm-order btn--primary py-2"
            button-type="submit"
            >
                建立訂單
            </base-button>
           
        </div>
    </form>
    
</template>

<style lang="scss" scoped>
    .check-out-form{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .shipping-adress{
        display: flex;
        flex-wrap: wrap;
    }
    .name, .address, .tel, .email, .remark{
        width: 50%;
    }
    .name, .tel, .remark{
        padding-right: 1.5rem;
    }
    .address, .email{
        padding-left: 1.5rem;
    }
    .invalid{
        display: block;
        color: $danger;
        font-size: 14px;
    }
    .required{
        color: $danger;
    }
    .payment-method{
        display: flex;
    }
    .input-field{
        padding: 5px 5px;
        width: 100%;
        border: 1.5px solid $secondary;
        border-radius: 3px;
        color: $dark;
        &:focus{
            outline: 0;
            border: 1.5px solid $primary;
        }
    }
    .button-group{
        display: flex;
        justify-content: space-between;
    }
    .return-cart-list, .confirm-order{
        max-width: 300px;
        width: 100%;
    }
    .return-cart-list{
        margin-right: 10px;
    }
    .confirm-order{
        margin-left: 10px;
    }
    @include media-breakpoint-down(md){
        .shipping-adress{
            flex-direction: column;
        }
        .name, .address, .tel, .email, .remark{
            width: 100%;
            padding: 0;
        }
        .payment-method{
            flex-direction: column;
        }
    }
    @include media-breakpoint-down(sm){
        .button-group{
            flex-direction: column;
        }
        .return-cart-list, .confirm-order{
            max-width: none;
            width: 100%;
            margin: 10px 0;
        }
    }
</style>

<script setup>
    import axios from 'axios';
    import { reactive, ref, computed, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import BaseButton from '@/components/BaseButton.vue';
    const router = useRouter();
    
    const routerPush = (path) => {
        router.push(`${path}`);
    }

    const order = reactive({ user:{} });
    const placeOrder = () => {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/order`;
        axios.post(api, { data: order })
        .then(res => {
            console.log(res.data);
            if (res.data.success) {
                routerPush(`/check-out/${res.data.orderId}`);
            }
        })
    }
    

    const telInput = ref(null);
    const telInputVal = ref('');
    const inputEvent = () => {
        telInputVal.value = telInput.value.value;
    }
    const telInputCheck = computed(() => {
        //判斷是不是"不是數字"
        if(telInputVal.value === '' || isNaN(telInputVal.value) === false){
            return false;
        }else{
            return true
        }
    });
</script>

