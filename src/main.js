import './assets/styles/main.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import uz from './locales/uz.json';
import ru from './locales/ru.json';
import en from './locales/en.json';
import App from './App.vue';
import router from './router';

const messages = {
    uz,
    ru,
    en
};

const i18n = createI18n({
    locale: 'uz',
    messages,
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.mount('#app');
