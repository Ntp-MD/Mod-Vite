import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    theme: "dark",
  }),
  getters: {
    isDark: (state) => state.theme === "dark",
  },
  actions: {
    initTheme() {
      // Only access localStorage on client side
      if (process.client) {
        this.theme = localStorage.getItem("theme") || "dark";
      }
      
      const app = document.getElementById("App");
      if (app) {
        app.classList.toggle("dark-mode", this.isDark);
        app.classList.toggle("light-mode", !this.isDark);
      }
    },
    toggleTheme() {
      this.theme = this.isDark ? "light" : "dark";
      
      // Only access localStorage on client side
      if (process.client) {
        localStorage.setItem("theme", this.theme);
      }
      
      const app = document.getElementById("App");
      if (app) {
        app.classList.toggle("dark-mode", this.isDark);
        app.classList.toggle("light-mode", !this.isDark);
      }
    },
  },
});
