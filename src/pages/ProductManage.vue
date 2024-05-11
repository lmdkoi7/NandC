<template>
    <h5 class=" mb-3">新增商品</h5>
    <div class="d-flex p-3">
        <div class="product-info ">
            <h6 class="w-100 mb-1">名稱</h6>
            <input class="w-100 mb-3" type="text" placeholder="請輸入商品名稱">
            
                <div class="w-50">
                    <h6 class="mb-1">分類</h6>
                    <select class="w-100 category mb-3" name="category" id="category">
                        <option value="家事皂">家事皂</option>
                        <option value="沐浴皂">沐浴皂</option>
                    </select>
                </div>
                <div class="w-50">
                    <h6 class="mb-1">單位</h6>
                    <input class="w-100 mb-3" type="text" placeholder="請輸入商品名稱">
                </div>
                <div class="w-50">
                    <h6 class="mb-1">原價</h6>
                    <input class="w-100 mb-3" type="text" placeholder="請輸入商品名稱">
                </div>
                <div class="w-50">
                    <h6 class="mb-1">售價</h6>
                    <input class="w-100 mb-3" type="text" placeholder="請輸入商品名稱">
                </div>
            
        </div>
        
        <div class="product-image">
            <h6 class="mb-2">商品圖片</h6>
            <div class="images-group">
                <input class="input-file" id="upload-img" type="file">
                <label class="upload-img" for="upload-img">
                    <i class="icon bi bi-image"></i>
                    <span>上傳圖片</span>
                </label>
                <div class="image" v-for="img in store.tempProdut.images">
                    <div class="overlay"></div>
                    <img class=""
                    :src="img.imageUrl"
                    >
                    <button class="delete-btn" 
                    type="button"
                    @click="deleteImage()">
                        <i class="bi bi-trash3"></i>
                    </button> 
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '@/assets/pages/product-manage.scss';
</style>

<script setup>
    import { ref, onBeforeMount } from 'vue';
    import { useDashboardStore } from '@/stores/dashboardStore';

    const store = useDashboardStore();

    const deleteImage = () => {
        alert('ff');
    }
    onBeforeMount(()=>{
        console.log(store.tempProdut);
    })
</script>