import "./assets/styles/main.scss";
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createI18n } from "vue-i18n";
import uz from "./locales/uz.json";
import ru from "./locales/ru.json";
import en from "./locales/en.json";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000";

const messages = { uz, ru, en };

const i18n = createI18n({
  locale: "uz",
  messages,
});

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(i18n);
app.mount("#app");
