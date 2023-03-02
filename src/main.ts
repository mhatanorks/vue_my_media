import { createApp } from "vue";
import "./styles/css/style.css";
import "./styles/css/tailwind.css";
import App from "./App.vue";
import router from './router/index'

const app = createApp(App); //Vue のインスタンスを生成
app.use(router);
app.mount("#app");
