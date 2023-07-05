/*
 * @Author: Jackie
 * @Date: 2023-06-25 09:58:10
 * @LastEditTime: 2023-07-05 21:51:04
 * @LastEditors: Jackie
 * @Description: file content
 * @FilePath: /vue3-element-plus-demo/src/main.js
 * @version:
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/utils';

// import 'element-plus/dist/index.css';
import 'element-plus/es/components/message/style/css';

createApp(App).use(store).use(router).mount('#app');
