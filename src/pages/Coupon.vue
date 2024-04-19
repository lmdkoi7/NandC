<template>
    <div class="add-coupon">
        <base-button class="add-coupon-btn fw-bolder py-2" @click="modalShow=true">
            <i class="bi bi-plus-lg"></i>
            新增優惠券
        </base-button>
    </div>
    <table class="coupon-table w-100 mt-4">
        <thead class="thead">
            <tr>
                <th class="th">名稱</th>
                <th class="th">優惠碼</th>
                <th class="th">折扣百分比</th>
                <th class="th">到期日</th>
                <th class="th">是否啟用</th>
                <th class="th">編輯</th>
            </tr>
        </thead>
        <tbody class="tbody ">
            <tr v-for="item in couponList" :key="item.id">
                <td class="td">{{ item.title }}</td>
                <td class="td">{{ item.code }}</td>
                <td class="td">{{ item.percent }}%</td>
                <td class="td">{{ item.due_date }}</td>
                <td class="td">{{ item.is_enabled }}</td>
                <td class="td">u</td>
            </tr>
        </tbody>
    </table>

    <div class="add-coupon-modal p-3" v-show="modalShow">
        <div class="modal-header pb-3">
            <h5 class="fw--bold">新增優惠券</h5>
        </div>
        <div class="modal-body">
            <h6 class="mb-1">優惠券名稱</h6>
            <input class="mb-3" type="text" v-model="coupon.title">

            <h6 class="mb-1">優惠碼</h6>
            <input class="mb-3" type="text" v-model="coupon.code">
            
            <h6 class="mb-1">折扣百分比</h6>
            <input class="mb-3" type="text" v-model.number="coupon.percent">

            <h6 class="mb-1">到期日</h6>
            <input class="mb-3" type="text" v-model.number="coupon.due_date">

            <h6 class="mb-1">是否啟用</h6>
            <input class="mb-3" type="checkbox" v-model="coupon.is_enabled" :true-value="1" :false-value="0">
            
        </div>
        <div class="modal-footer pt-3">
            <base-button class="cancel-btn p-2" @click="modalShow=false">取消</base-button>
            <base-button class="save-btn p-2 ms-4" 
            @click="addCoupon()"
            >
                儲存
            </base-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '@/assets/pages/_coupon.scss';
</style>

<script setup>
    import axios from 'axios';
    import BaseButton from '@/components/BaseButton.vue';
    import BaseModal from '@/components/BaseModal.vue';
    import { ref, onBeforeMount } from 'vue';

    const modalShow = ref(false);

    const coupon = ref({});
    const couponList = ref();
    const addCoupon = () => {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/coupon`;
        axios.post(api, { data: coupon.value })
        .then(res => {
            console.log(res.data);
            coupon.value = '';
        })
    }

    const getCouponList = (page=1) => {
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/coupons?page=:${page}`;
        axios.get(api).then(res => {
            couponList.value=res.data.coupons;
        })
    };
    onBeforeMount(getCouponList);
</script>