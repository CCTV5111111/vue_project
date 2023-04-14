import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './assets/fonts/iconfont.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Breadcrumb from './components/Breadcrumb.vue';
import { ElMessage } from 'element-plus';
import Pagination from './components/Pagination.vue';
import locale from 'element-plus/dist/locale/zh-cn.mjs'
import store from './store';





const app = createApp(App);

app.use(ElementPlus, { size: 'default', zIndex: 9999, locale });
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router);


app.use(store);


app.component('Breadcrumb', Breadcrumb);

app.component('Pagination', Pagination);

app.config.globalProperties.$ElMessage = ElMessage;

app.mount('#app');
