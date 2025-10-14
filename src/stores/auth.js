import { defineStore } from "pinia";
import userData from "@/assets/data/user-account.json";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    user: null,
  }),

  actions: {
    login(username, password) {
      const user = userData.users.find((u) => u.username === username && u.password === password);

      if (user) {
        this.isAuthenticated = true;
        this.user = { username: user.username };
        localStorage.setItem("auth", JSON.stringify({ isAuthenticated: true, user: this.user }));
        return true;
      }
      return false;
    },

    logout() {
      this.isAuthenticated = false;
      this.user = null;
      localStorage.removeItem("auth");
    },

    initializeAuth() {
      const auth = JSON.parse(localStorage.getItem("auth"));
      if (auth) {
        this.isAuthenticated = auth.isAuthenticated;
        this.user = auth.user;
      }
    },
  },
});
