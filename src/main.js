
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import axios from 'axios'
import VueAxios from 'vue-axios'
import LoadingVue from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

import App from './App.vue';
import router from './router';
import { currency } from './method/filter';


const app = createApp(App);//利用App.vue創建一個vue實體

router.afterEach((to,from,next)=>{
    window.scrollTo({
        top: 0,
        behavior: 'instant'
    });
});

app.config.globalProperties.$filter={currency};
app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
app.component('LoadingVue',LoadingVue);

app.mount('#app');//將vue實體掛載到body的<div id="app">節點

