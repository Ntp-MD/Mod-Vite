import "./css/app.css";
import "./css/core.css";
import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router"; // Import the router

const app = createApp(App);

const components = import.meta.glob("@/components/*.vue");

for (const path in components) {
  components[path]().then((module) => {
    const component = module.default;
    app.component(component.name, component); // Use the `name` property from the component
  });
}

app.use(router); // Use the router in the app
app.mount("#App");

$(document).ready(function () {
  if (localStorage.getItem("darkMode") === "enabled") {
    $("body").addClass("dark-mode");
  }
});

$(document).on("click", function (e) {
  if ($(e.target).closest(".toggle-mode").length) {
    $("body").toggleClass("dark-mode");

    // Save the mode in local storage
    if ($("body").hasClass("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
    } else {
      localStorage.setItem("darkMode", "disabled");
    }
  }
});

$(document).ready(function () {
  $(document).on("click", function (e) {
    if ($(e.target).closest("#aside").length) {
      $("aside").toggleClass("open");
    } else {
      $("aside").removeClass("open");
    }
  });
});
