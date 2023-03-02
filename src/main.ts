import { createApp } from "vue";
import { createPinia } from 'pinia'
import "./styles/css/style.css";
import "./styles/css/tailwind.css";
import App from "./App.vue";
import router from './router/index'

const app = createApp(App); //Vue のインスタンスを生成
const pinia = createPinia()

app.use(router);
app.use(pinia)
app.mount("#app");



