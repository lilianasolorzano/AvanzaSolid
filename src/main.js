import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { createPinia } from "pinia";
import VueCookies from 'vue-cookies';

const pinia = createPinia();
createApp(App).use(vuetify).use(router).use(pinia).use(VueCookies).mount("#app");
