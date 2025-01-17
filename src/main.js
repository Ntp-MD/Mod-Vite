import "./css/app.css"
import "./css/variables.scss"
import { createApp } from "vue"
import App from "@/App.vue"
import router from "@/router.js" // Import the router

// Initialize Vue App
const app = createApp(App)

// Dynamically import and register all components in the `/components` folder
const components = import.meta.glob("@/components/*.vue")

;(async () => {
  for (const path in components) {
    try {
      const module = await components[path]()
      const component = module.default
      if (component?.name) {
        app.component(component.name, component) // Register by the `name` property
      } else {
        console.warn(`Component in ${path} is missing a 'name' property.`)
      }
    } catch (error) {
      console.error(`Failed to load component at ${path}:`, error)
    }
  }
})()

// Use the router in the app
app.use(router)
app.mount("#App")

// jQuery Code
function initializeJQuery() {
  $(document).ready(function () {
    // Apply dark mode if saved in localStorage
    if (localStorage.getItem("darkMode") === "enabled") {
      $("body").addClass("dark-mode")
    }

    // Toggle dark mode
    $(document).on("click", ".toggle-mode", function () {
      $("body").toggleClass("dark-mode")
      localStorage.setItem("darkMode", $("body").hasClass("dark-mode") ? "enabled" : "disabled")
    })
  })
}

// Initialize jQuery
initializeJQuery()
