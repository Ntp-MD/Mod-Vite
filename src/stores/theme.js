import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    theme: localStorage.getItem("theme") || "dark",
  }),
  getters: {
    isDark: (state) => state.theme === "dark",
  },
  actions: {
    toggleTheme() {
      this.theme = this.isDark ? "light" : "dark";
      localStorage.setItem("theme", this.theme);
      const app = document.getElementById("App");
      if (app) {
        app.classList.toggle("dark-mode", this.isDark);
        app.classList.toggle("light-mode", !this.isDark);
      }
    },
  },
});
