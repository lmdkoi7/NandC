<template>
    <div class="productManage__content ">
        <h5 class=" mb-3">新增商品</h5>
        <div class="d-flex flex-wrap mb-5">
            <div class="product-info">
                <h6 class="w-100 mb-1">名稱</h6>
                <input class="w-100 mb-3" type="text" 
                placeholder="請輸入商品名稱" 
                v-model="store.tempProduct.title">
                
                <div class="w-50">
                    <h6 class="mb-1">分類</h6>
                    <select class="w-100 category mb-3" name="category" id="category"
                    v-model="store.tempProduct.category">
                        <option value="家事皂">家事皂</option>
                        <option value="沐浴皂">沐浴皂</option>
                    </select>
                </div>    
                <div class="w-50">
                    <h6 class="mb-1">單位</h6>
                    <input class="w-100 mb-3" type="text" 
                    placeholder="請輸入商品名稱"
                    v-model="store.tempProduct.unit">
                </div>
                <div class="w-50">
                    <h6 class="mb-1">原價</h6>
                    <input class="w-100 mb-3" type="number" 
                    placeholder="請輸入商品原價"
                    v-model="store.tempProduct.origin_price">
                </div>
                <div class="w-50">
                    <h6 class="mb-1">售價</h6>
                    <input class="w-100 mb-3" type="number" 
                    placeholder="請輸入商品售價"
                    v-model="store.tempProduct.price">
                </div>
                <div class="product-label w-100">
                    <h6 class="mb-1 w-100">商品標籤</h6>
                    <input class="w-100 mb-3" type="text" 
                    placeholder="請輸入商品標籤">
                </div>
            </div>
            
            <div class="product-image">
                <h6 class="mb-2">商品圖片</h6>
                <div class="images-group">
                    <input class="input-file" id="upload-img" 
                    type="file"
                    ref="imageInput"
                    @change="uploadImage">
                    <label class="upload-img" for="upload-img">
                        <i class="icon bi bi-image"></i>
                        <span>上傳圖片</span>
                    </label>
                    <div class="image" v-for="(img, key) in store.tempProduct.images" :key="key">
                        <div class="overlay"></div>
                        <img class=""
                        :src="img.imageUrl"
                        >
                        <button class="delete-btn" 
                        type="button"
                        @click="store.tempProduct.images.splice(key, 1)">
                            <i class="bi bi-trash3"></i>
                        </button> 
                    </div>
                    <div class="uploading" v-show="isUploading">
                        <loading-vue class="loading-overlay"
                        :active="isUploading"
                        :height="30"
                        />
                    </div>
                </div>
            </div>
            <div class="product-description">
                <h6 class="mb-1 w-100">商品描述</h6>
                <textarea class="w-100 mb-3" rows="4" 
                placeholder="請輸入產品描述"
                v-model="store.tempProduct.description">
                </textarea>
            </div>
            
            <div class="product-ingredient">
                <h6 class="mb-1">成分</h6>
                <textarea class="w-100 mb-3" type="text" rows="4"
                placeholder="請輸入商品成分"
                v-model="store.tempProduct.ingredient">
                </textarea>
            </div>

            <div class="">
                <div class="product-qty">
                    <h6 class="mb-1 w-100">庫存數量</h6>
                    <input class="w-100 mb-3" type="number" 
                    placeholder="請輸入庫存數量">
                </div>
                <div class="product-shelf-life">
                    <h6 class="mb-1 w-100">保存期限</h6>
                    <input class="w-100 mb-3" type="text" 
                    placeholder="請輸入保存期限">
                </div>
                <div class="product-weight">
                    <h6 class="mb-1 w-100">重量</h6>
                    <input class="w-100 mb-3" type="text" 
                    placeholder="請輸入商品重量">
                </div>
                <div class="product-size">
                    <h6 class="mb-1 w-100">尺寸</h6>
                    <input class="w-100 mb-3" type="text" 
                    placeholder="請輸入商品尺寸">
                </div>
            </div>
            
            
        </div>
        
    </div>

    <div class="productManage__bottom">
        <base-button class="cancel-btn btn--secondary">
            取消
        </base-button>
        <base-button class="save-btn btn--primary ">
            儲存
        </base-button>
    </div>

</template>

<style lang="scss" scoped>
    @import '@/assets/pages/product-manage.scss';
</style>

<script setup>
//用route.params.id發api取得資料
    import { ref, onBeforeMount } from 'vue';
    import { useDashboardStore } from '@/stores/dashboardStore';
    import axios from 'axios';
    import LoadingVue from 'vue3-loading-overlay';
    import BaseButton from '@/components/BaseButton.vue';

    const store = useDashboardStore();
    const isUploading = ref(false);

    const imageInput = ref(null);
    const uploadImage = () => {
        isUploading.value = true;
        const uploadImg = imageInput.value.files[0];
        const formData = new FormData();
        formData.append('file-to-upload', uploadImg);
        const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/upload`;
        axios.post(url, formData)
        .then(res => {
            if (res.data.success){
            const image = {imageName: uploadImg.name, imageUrl: res.data.imageUrl};
            store.tempProduct.images.push(image);
            isUploading.value = false;
        }
        })
    }


    onBeforeMount(()=>{
        console.log(store.tempProduct);
    })
</script>