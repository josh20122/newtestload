import App from './App.vue'
import { createApp } from "vue";
import router from './plugins/router';
import { registerPlugins } from '@/plugins'

// import axios from "axios";
// var myApi = axios.create({
//     baseURL: 'https://my-domain.com/api/',
//     timeout: 1000,
//     headers: {'X-Custom-Header': 'CustomHeader1'}
//   });

const app = createApp(App).use(router)

registerPlugins(app)

app.mount('#app')
