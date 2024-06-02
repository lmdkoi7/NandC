<template>
    <div class="productManage__content ">
        
        <h5 class="fw--semi-bold mb-3">新增商品</h5>
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
                <div class="product-label w-50">
                    <h6 class="mb-1 w-100">商品標籤</h6>
                    <input class="w-100 mb-3" type="text" 
                    placeholder="請輸入商品標籤">
                </div>
                <div class="product-qty  w-50">
                    <h6 class="mb-1 w-100">庫存數量</h6>
                    <input class="w-100 mb-3" type="number" 
                    placeholder="請輸入庫存數量">
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
            <div class="product-use mb-3">
                <h6 class="mb-1">用途</h6>
                <textarea class="w-100" 
                placeholder="請輸入用途"
                name="" id=""  rows="4" 
                v-model="store.tempProduct.use"
                ></textarea>
            </div>
            <div class="product-usage mb-3">
                <h6 class="mb-1 w-100">使用方式</h6>
                <textarea class="w-100" 
                placeholder="請輸入使用方式"
                name="" id=""  rows="4" 
                v-model="store.tempProduct.usage"
                ></textarea>
            </div>   
            <div class="product-info mb-3">               
                <div class="product-weight w-50">
                    <h6 class="mb-1">重量</h6>
                    <input class="w-100 mb-3" type="text" 
                    placeholder="請輸入商品重量">
                </div>
                <div class="product-size w-50 mb-3">
                    <h6 class="mb-1">尺寸</h6>
                    <input class="w-100 mb-3" type="text" 
                    placeholder="請輸入商品尺寸">
                </div>
                <div class="product-shelf-life w-50">
                    <h6 class="mb-1 w-100">保存期限</h6>
                    <input class="w-100 mb-3" type="text" 
                    placeholder="請輸入保存期限">
                </div>
            </div>
            <div class="product-preservation ">
                <h6 class="mb-1">保存方式</h6>
                <textarea class="w-100" 
                placeholder="請輸入保存方式"
                name="" id=""  rows="4" 
                
                ></textarea>            
            </div>   
            
              

            <div class="order-notification mb-3">
                <h6 class="mb-1">訂購須知</h6>
                <textarea class="w-100 " 
                placeholder="請輸入訂購須知"
                name="" id=""  rows="4" 
                
                ></textarea>
            </div>
            <div class="notes">
                <h6 class="mb-1">注意事項</h6>
                <textarea class="w-100 " 
                placeholder="請輸入注意事項"
                name="" id=""  rows="4" 
                
                ></textarea>
            </div>         
            
            <div class="product-is_enabled">
                <h6 class="mb-2">商品狀態</h6>
                <div class="toggle"
                :class="{ enable: store.tempProduct.is_enabled, disable: !store.tempProduct.is_enabled}">
                    <span class="toggle--enable">啟用</span>
                    <button class="toggle-btn mx-1" 
                   
                    type="button" 
                    @click="productActiveToggle()"></button>
                    <span class="toggle--disable">停用</span>
                </div>
            </div>
        </div>
        <h5 class="fw--semi-bold mb-3">篩選標籤</h5>
        <div class="filter-label--skin-type">
            <h6 class="w-100 mb-1">適用膚質</h6>
            <div class="d-flex w-100 mb-3">
                <input class="filter-label__input" type="text" v-model="skinTypeLabel">
                <base-button class="btn--primary w-auto py-1 px-2" @click="addLabel(store.tempProduct.skinType, skinTypeLabel)">
                    加入標籤
                </base-button>
            </div>
            <filter-label class="me-3" v-for="label, index in store.tempProduct.skinType" :key="index"
            @deleteLabel="store.tempProduct.skinType.splice(index, 1)">
                {{ label }}
            </filter-label>
        </div>
    </div>

    <div class="productManage__bottom">
        <base-button class="cancel-btn btn--secondary"
        >
            取消
        </base-button>
        <base-button class="save-btn btn--primary"
        @click="updateProduct()">
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
    import { useRoute, useRouter } from 'vue-router';
    import { useDashboardStore } from '@/stores/dashboardStore';
    import axios from 'axios';
    import LoadingVue from 'vue3-loading-overlay';
    import BaseButton from '@/components/BaseButton.vue';
    import FilterLabel from '@/components/FilterLabel.vue';

    const route = useRoute();
    const router = useRouter();
    const store = useDashboardStore();
    const isUploading = ref(false);

    const imageInput = ref(null);
    const uploadImage = () => {
        if (!store.tempProduct.images) {
            store.tempProduct.images = [];
        };
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
        }})
    };

    const skinTypeLabel = ref('');
    const addLabel = (labelArr, labell) => {
        /*if (!labelArr) {
            labelArr = [];
        };
        labelArr.push(label);
        */
        console.log(labell, skinTypeLabel);
        labell='1';
        console.log(labell, skinTypeLabel);
    };

    const updateProduct = () => {
        let httpMethod = 'post';
        let api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/product`;

        if (route.params.id) {
            httpMethod = 'put';
            api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/product/${store.tempProduct.id}`;
        };
        axios[httpMethod](api, { data: store.tempProduct}).then(res => {
            console.log(res);
            router.push('/dashboard/products');
        });

    };

    
    const productActiveToggle = () => {
        store.tempProduct.is_enabled = !store.tempProduct.is_enabled;
    }
    onBeforeMount(() => {
        if (route.params.id) {
            const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/product/${route.params.id}`;
            axios.get(api).then(res => {
                console.log(res.data.product);
                store.tempProduct = res.data.product;
            })
        }
        
    });
</script>