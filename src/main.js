import "@/assets/style/app.css";
import { createApp, ref, computed } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router.js";

const app = createApp(App);
const pinia = createPinia();

// ---- Theme state with localStorage persistence ----
const storedTheme = localStorage.getItem("theme");
const isDarkMode = ref(storedTheme === null ? true : storedTheme === "dark");

const themeClass = computed(() => (isDarkMode.value ? "dark-mode" : "light-mode"));

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem("theme", isDarkMode.value ? "dark" : "light");
};

// Expose theme state and function globally
app.config.globalProperties.$theme = {
  isDarkMode,
  themeClass,
  toggleTheme,
};

// ---- Auto register components ----
const enableAutoRegister = false;

if (enableAutoRegister) {
  const components = import.meta.glob("@/components/**/*.vue");
  (async () => {
    for (const path in components) {
      try {
        const module = await components[path]();
        const component = module.default;
        if (component?.name) {
          app.component(component.name, component);
        } else {
          console.warn(`Component in ${path} is missing a 'name' property.`);
        }
      } catch (error) {
        console.error(`Failed to load component at ${path}:`, error);
      }
    }
  })();
}

// Install plugins
app.use(pinia); // Install Pinia first
app.use(router); // Then install router

app.mount("#App");
