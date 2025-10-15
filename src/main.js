import "@/assets/style/app.css";
import { createApp, ref, computed } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router.js";

const app = createApp(App);
const pinia = createPinia();

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

app.use(pinia);
app.use(router);

app.mount("#App");
