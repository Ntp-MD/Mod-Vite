import "./assets/style/main.css";
import { createApp, ref, computed } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router/router.js";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount("#App");

// Apply theme on startup
import { useSettingsStore } from "@/stores/theme.js";
const settings = useSettingsStore();
settings.initTheme();
