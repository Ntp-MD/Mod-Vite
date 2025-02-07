import "./css/app.css";
import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router.js"; // Import the router

// Initialize Vue App
const app = createApp(App);

// Dynamically import and register all components in the `/components` folder
const components = import.meta.glob("@/**/*.vue");
(async () => {
  for (const path in components) {
    try {
      const module = await components[path]();
      const component = module.default;
      if (component?.name) {
        app.component(component.name, component); // Register by the `name` property
      } else {
        console.warn(`Component in ${path} is missing a 'name' property.`);
      }
    } catch (error) {
      console.error(`Failed to load component at ${path}:`, error);
    }
  }
})();

// Use the router in the app
app.use(router);
app.mount("#App");
