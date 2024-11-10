//src / main.js;
import { createApp } from "vue";
import App from "./App.vue";
import { Quasar } from "quasar";
import { createPinia } from "pinia";
import "devextreme/dist/css/dx.light.css";

createApp(App).use(Quasar).mount("#app");
