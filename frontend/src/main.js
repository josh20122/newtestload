import App from './App.vue'
import { createApp } from "vue";
import router from './plugins/router';
import { registerPlugins } from '@/plugins'
import '@formkit/themes/genesis'
import { plugin as FKp, defaultConfig as FKdc } from '@formkit/vue';
// import axios from "axios";
// var myApi = axios.create({
//     baseURL: 'https://my-domain.com/api/',
//     timeout: 1000,
//     headers: {'X-Custom-Header': 'CustomHeader1'}
//   });

const app = createApp(App).use(router).use(FKp, FKdc)

registerPlugins(app)

app.mount('#app')
