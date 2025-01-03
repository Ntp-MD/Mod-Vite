import "./style/app.css";
import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router.js"; // Import the router

// Initialize Vue App
const app = createApp(App);

// Dynamically import and register all components in the `/components` folder
const components = import.meta.glob("@/components/*.vue");

for (const path in components) {
  components[path]().then((module) => {
    const component = module.default;
    if (component?.name) {
      app.component(component.name, component); // Register by the `name` property
    } else {
      console.warn(`Component in ${path} is missing a 'name' property.`);
    }
  });
}

// Use the router in the app
app.use(router);
app.mount("#App");

// jQuery Code
$(document).ready(function () {
  // Apply dark mode if saved in localStorage
  if (localStorage.getItem("darkMode") === "enabled") {
    $("body").addClass("dark-mode");
  }

  // Toggle dark mode
  $(document).on("click", ".toggle-mode", function () {
    $("body").toggleClass("dark-mode");

    // Save the mode in localStorage
    localStorage.setItem("darkMode", $("body").hasClass("dark-mode") ? "enabled" : "disabled");
  });

  // Toggle 'open' class on aside when clicking #aside or close it when clicking outside
});
