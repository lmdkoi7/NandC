<template>
    <div class="modal__back-drop" :class="{'modal__back-drop--active':isModalActive}"></div>
    <div class="desktop-modal " :class="{'modal--active':isModalActive}">
        <div class="modal-content">
            <div class="modal-header p-3">
                <h5 class="modal-title fw-bolder">新增商品</h5>
            </div>
            <div class="modal-body">
                <div class="modal-body__side-bar p-3">
                    <a class="mb-4" @click.prevent="pageToggle('info')" href="">商品資訊</a>
                    <a class="mb-4" @click.prevent="pageToggle('description')" href="">商品說明</a>
                    <a class="" @click.prevent="pageToggle('filterLabel')" href="">商品標籤</a>
                </div>

                <div class="modal-body__product-info" v-show="productModalPage==='info'">
                    <div class=" product-info__infomation  p-3 rounded-3">
                        <div class="title">
                            <h6>名稱</h6>
                            <input class="input-field mt-2" 
                            type="text" 
                            placeholder="請輸入產品名稱"
                            v-model="tempProduct.title"
                            >
                        </div>
                        <div class="d-flex">
                            <div class="category w-50 me-2">
                                <h6>分類</h6>
                                <input class="input-field mt-2" 
                                type="text" 
                                placeholder="請輸入產品分類"
                                v-model="tempProduct.category"
                                >    
                            </div>
                            <div class="unit w-50 ms-2">
                                <h6>單位</h6>
                                <input class="input-field mt-2 " 
                                type="text" 
                                placeholder="請輸入產品單位"
                                v-model="tempProduct.unit"
                                >
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="origin_price w-50 me-2">
                                <h6>原價</h6>
                                <input class="input-field mt-2" 
                                type="number" 
                                placeholder="請輸入產品原價" 
                                v-model="tempProduct.origin_price"
                                >
                            </div>
                            <div class="price w-50 ms-2">
                                <h6>售價</h6>
                                <input class="input-field mt-2" 
                                type="number" 
                                placeholder="請輸入產品售價" 
                                v-model="tempProduct.price"
                                >
                            </div>
                        </div>
                        <div class="description ">
                            <h6>描述</h6>
                            <textarea class="input-field mt-2" 
                            placeholder="請輸入產品描述"
                            name="" id=""  rows="3" 
                            v-model="tempProduct.description"
                            >
                            </textarea>
                        </div>
                        <div class="d-flex">
                            <div class="label w-50 me-2">
                                <h6>商品標籤</h6>
                                <input class="input-field mt-2" 
                                type="text" 
                                placeholder="請輸入優惠內容"
                                v-model="tempProduct.label"
                                >
                            </div>
                            <div class="quantity w-50 ms-2">
                                <h6>庫存數量</h6>
                                <input class="input-field mt-2"                     
                                type="number"
                                placeholder="請輸入庫存數量"
                                v-model.number="tempProduct.stock"
                                >
                            </div>
                        </div>
                            
                            <div class="checkbox">
                                <input class="me-1" 
                                type="checkbox" name="" 
                                id="is-enabled" 
                                v-model="tempProduct.is_enabled"
                                >
                                <label for="is-enabled">是否啟用</label>
                            </div>
                            
                        </div>
                        
                    <div class="product-info__imgs  p-3 rounded-3">
                        <div class="upload-img">
                            <h6>上傳圖片</h6>
                            <input 
                            name="file-to-upload"
                            class="input-file mt-2 w-100" 
                            id="customFile"
                            type="file"
                            ref="fileInput"
                            @change="uploadFile"
                            >
                        </div>
                        <div class="uploaded-img-wrap mt-3">    
                            <loading 
                            class="loading"
                            :active="isLoading" 
                            :is-full-page="false"/>  

                            <div class="uploaded-img mb-3" v-for="image,key in tempProduct.images" :key="key">
                                <img 
                                class="preview-img img-fluid"
                                :src="image.imageUrl">
                                <span class="img-name mx-3">{{ image.imageName }}</span>
                                <icon-button
                                @click="tempProduct.images.splice(key,1)"
                                btn-icon="bi bi-trash3"
                                btn-icon-size="16px"/>
                            </div>
                        </div>
                    </div>
                </div> 
                <!--產品說明-->
                <div class="modal-body__product-description" v-show="productModalPage==='description'">
                    <div class=" product-info__description1  p-3 rounded-3">
                        <div class="ingredient">
                            <h6>成分</h6>
                            <textarea class="input-field mt-2" 
                            placeholder="請輸入產品成分"
                            name="" id=""  rows="2" 
                            v-model="tempProduct.ingredient"
                            ></textarea>
                        </div>
                        <div class="d-flex">
                            <div class="shelf-life w-50 me-2">
                                <h6>保存期限</h6>
                                <input class="input-field mt-2" 
                                type="text" 
                                placeholder="請輸入保存期限" 
                                v-model="tempProduct.shelfLife"
                                >
                            </div>
                            <div class="weight w-50 ms-2">
                                <h6>重量</h6>
                                <input class="input-field mt-2" 
                                type="text" 
                                placeholder="請輸入產品重量" 
                                v-model="tempProduct.weight"
                                >
                            </div>
                        </div>
                        <div class="size">
                            <h6>尺寸</h6>
                            <input class="input-field mt-2" 
                            type="text" 
                            placeholder="請輸入產品尺寸" 
                            v-model="tempProduct.size"
                            >
                        </div>
                        <div class="preservation">
                            <h6>保存方式</h6>
                            <textarea class="input-field mt-2" 
                            placeholder="請輸入保存方式"
                            name="" id=""  rows="2" 
                            v-model="tempProduct.preservation"
                            ></textarea>
                        </div>
                        <div class="how-to-use">
                            <h6>使用方式</h6>
                            <textarea class="input-field mt-2" 
                            placeholder="請輸入使用方式"
                            name="" id=""  rows="2" 
                            v-model="tempProduct.howToUse"
                            ></textarea>
                        </div>
                    </div>
                    
                    <div class=" product-info__description2  p-3 rounded-3">
                        <div class="usage">
                            <h6>用途</h6>
                            <textarea class="input-field mt-2" 
                            placeholder="請輸入使用方式"
                            name="" id=""  rows="2" 
                            v-model="tempProduct.usage"
                            ></textarea>
                        </div>
                        
                        <div class="uses">
                            <h6>訂購須知</h6>
                            <textarea class="input-field mt-2" 
                            placeholder="請輸入訂購須知"
                            name="" id=""  rows="3" 
                            v-model="tempProduct.orderNotification"
                            ></textarea>
                        </div>
                        <div class="notes">
                            <h6>注意事項</h6>
                            <textarea class="input-field mt-2" 
                            placeholder="請輸入注意事項"
                            name="" id=""  rows="3" 
                            v-model="tempProduct.notes"
                            ></textarea>
                        </div>
                    </div>
                </div>
                <!--產品標籤-->
                <div class="modal-body__filter-label" v-show="productModalPage==='filterLabel'">
                    <div class="filter-label__skin-type p-3 rounded-3">
                        <div class="skin-type ">
                            <h6>適用膚質</h6>
                            <div class="d-flex mt-2">
                                <input class="input-field me-3" 
                                type="text" 
                                placeholder="請輸入適用膚質" 
                                v-model="skinTypeLabel"
                                >
                                <button @click="addSkinTypeLabel">新增</button>
                            </div>
                        </div>
                        <div class="mb-auto mt-3">
                           <filter-label class="me-3 mb-3" 
                           v-for="item,key in tempProduct.skinType" :key="key"
                           @delete-label="tempProduct.skinType.splice(key,1)"
                           >{{item}}</filter-label>
                        </div>
                    </div>

                    

                    <div class="filter-label__product-benefits p-3 rounded-3">
                        <div class="product-benefits">
                            <h6>商品功效</h6>
                            <div class="d-flex mt-2">
                                <input class="input-field me-3" 
                                type="text" 
                                placeholder="請輸入商品功效" 
                                v-model="benefitsLabel"
                                >
                                <button @click="addBenefitsLabel">新增</button>
                            </div>
                        </div>
                        <div class="mb-auto mt-3">
                           <filter-label class="me-3 mb-3" 
                           v-for="item,key in tempProduct.benefits" :key="key"
                           @delete-label="tempProduct.benefits.splice(key,1)"
                           >{{item}}</filter-label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer p-3">
                <base-button class="cancel-btn btn--secondary px-3 py-2 me-4" @click="hideModal">取消</base-button>
                <base-button class="confirm-btn btn--primary px-3 py-2"  @click="$emit('updateProduct',tempProduct)">確認</base-button>
            </div>
        </div>
    </div>

</template>

<script setup>
import axios from 'axios';
import IconButton from '@/components/IconButton.vue';
import BaseButton from '@/components/BaseButton.vue';
import FilterLabel from  '@/components/FilterLabel.vue';
import Loading from 'vue3-loading-overlay';

import { ref,watch } from 'vue';

const isLoading = ref(false);
const tempProduct=ref({});

const props= defineProps({
    propsProduct:{
    type:Object,
    default:{}}
})
watch(()=>props.propsProduct,()=>{
    //深拷貝，防止子元件影響父元件的props值(因為有物件傳參考特性)
    tempProduct.value = JSON.parse(JSON.stringify(props.propsProduct));
    if(!tempProduct.value.images){
        tempProduct.value.images=[];
    }
    if(!tempProduct.value.skinType){
        tempProduct.value.skinType=[];
    }
    if(!tempProduct.value.benefits){
        tempProduct.value.benefits=[];
    }
})

const body=document.body;
const isModalActive=ref(false);
const showModal=()=>{
    isModalActive.value=true;
    body.classList.add('overflow-hidden');
}
const hideModal=()=>{
    tempProduct.value={};
    isModalActive.value=false;
    body.classList.remove('overflow-hidden');
}
defineExpose({showModal,hideModal});
defineEmits(['updateProduct']);

const fileInput=ref(null);

const uploadFile = () => {
    isLoading.value = true;
    const uploadImg = fileInput.value.files[0];
    const formData = new FormData();
    formData.append('file-to-upload', uploadImg);
    const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/upload`;
    axios.post(url,formData)
    .then((res) => {
        console.log(res.data);
        if (res.data.success){
            const image = {imageName: uploadImg.name,imageUrl:res.data.imageUrl};
            tempProduct.value.images.push(image)
            document.getElementById('customFile').value = '';
            isLoading.value = false;
        }
    })
}

const productModalPage=ref('info');
const pageToggle=(page)=>{
    productModalPage.value = page;
}

const skinTypeLabel=ref();
const benefitsLabel=ref();

const addSkinTypeLabel=()=>{
    tempProduct.value.skinType.push(skinTypeLabel.value);
    skinTypeLabel.value='';
}


const addBenefitsLabel=()=>{
    tempProduct.value.benefits.push(benefitsLabel.value);
    benefitsLabel.value='';
}
</script>

<style lang="scss" scoped>
@import "@/assets/components/product-modal";
</style>