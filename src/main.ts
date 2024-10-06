import { createApp } from "vue";
import App from "./App.vue";
import "./scss/global.scss";
import "vue3-toastify/dist/index.css";
import router from "./router/router";
import Vue3Toastify, { ToastContainerOptions } from "vue3-toastify";

const app = createApp(App);

app.use(router);

app.use(Vue3Toastify, {
  autoClose: 3000,
  position: "top-right",
  pauseOnHover: true,
} as ToastContainerOptions);

app.mount("#app");
