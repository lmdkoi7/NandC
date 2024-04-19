<template>
    <Loading :active="isLoading"></Loading>
    <div class="add-product ">
        <base-button class="add-product-btn fw-bolder py-2" @click="openModal(true)">
            <i class="bi bi-plus-lg"></i>
            新增產品
        </base-button>
    </div>
    <table class="product-table mt-4 w-100">
        <thead class="product-thead">
            <tr>
                <th class="category">分類</th>
                <th>照片</th>
                <th>名稱</th>
                <th>原價</th>
                <th>售價</th>
                <th class="is-enabled">是否啟用</th>
                <th class="edit">編輯</th>
            </tr>
        </thead>

        <tbody class="product-tbody">
            <tr class="product-tr" v-for="item in product" :key="item.id" mt-2>
                <td>{{item.category}}</td>
                <td class="td-image">
                    <img :src="item.images[0].imageUrl">
                </td>
                <td>{{item.title}}</td>
                <td>{{$filter.currency(item.origin_price)}}</td>
                <td>{{$filter.currency(item.price)}}</td>
                <td>
                    <span class="text-primary" v-if="item.is_enabled">啟用</span>
                    <span class="text-danger" v-else>停用</span>
                </td>
                <td>
                    <div class="btn-group">
                        <icon-button
                            class=""
                            btn-icon="bi bi-trash3"
                            btn-icon-size="18px"
                            @click="delModalShow(item)"
                        />
                        <icon-button
                            class=""
                            btn-icon="bi bi-pencil-square"
                            btn-icon-size="18px"
                            @click="openModal(false,item)"
                        /> 
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <product-modal 
        ref="productModal"
        :propsProduct="tempProduct"
        @update-product="updateProduct"
    />
    <div class="del-modal">
        <base-modal
        ref="delModal"
        modal-left-btn="取消"
        modal-right-btn="刪除"
        modal-title="刪除產品"
        :modal-content="delModalContent"
        @base-modal-btn="deletProduct()"
        />
    </div>
    <pagination
    :pages="pagination"
    @previous-page="getProducts"
    @update-page="getProducts"
    @next-page="getProducts"
    />
</template>

<script setup>
import axios from 'axios';
import { ref, onBeforeMount } from 'vue';
import ProductModal from '@/components/ProductModal.vue';
import BaseModal from '@/components/BaseModal.vue';
import IconButton from '@/components/IconButton.vue';
import BaseButton from '@/components/BaseButton.vue';
import Pagination from '@/components/Pagination.vue';
import Loading from 'vue3-loading-overlay';

const product=ref([]);
const pagination=ref({});  
const productModal=ref(null);
const tempProduct=ref({});
const isNew=ref(false);
const isLoading=ref(false);


const getProducts=(page=1)=>{
    const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/products/?page=${page}`;
    isLoading.value=true;
    axios.get(api)
    .then((res)=>{
        isLoading.value=false;
        if(res.data.success){
            console.log(res.data)
            product.value=res.data.products;
            pagination.value=res.data.pagination;
        }
    })
}
onBeforeMount(getProducts);

const openModal=(isnew,item)=>{
    if(isnew){
        tempProduct.value={};
    }
    else{
        tempProduct.value={ ...item };
    }
    isNew.value=isnew;
    productModal.value.showModal();
}

const updateProduct=(item)=>{
    tempProduct.value=item;
    let api=`${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/product`;
    let httpMethod='post';
    
    if(isNew.value==false){
        api=`${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/product/${item.id}`;
        httpMethod='put';  
    }
    axios[httpMethod](api, { data: tempProduct.value })
    .then((res)=>{
        console.log(res);
        getProducts();
        productModal.value.hideModal();
    })
}

const delModalContent=ref('');
const delModal=ref(null);
const deleteProductId=ref({});
const delModalShow=(item)=>{
    delModal.value.baseModalShow();
    delModalContent.value=`請問要刪除"${item.title}"嗎？`;
    deleteProductId.value=item.id;
}
const deletProduct=()=>{
    const api=`${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/product/${deleteProductId.value}`;
    axios.delete(api)
    .then((res)=>{
        console.log(res);
        getProducts();
    })
    delModal.value.baseModalClose();
}


</script>

<style lang="scss" scoped>
@import '@/assets/pages/product';
</style>