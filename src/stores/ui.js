import { defineStore } from "pinia";

export const useUiStore = defineStore("ui", {
  state: () => ({
    isLoading: false,
  }),
  actions: {
    setLoading(val) {
      this.isLoading = Boolean(val);
    },
  },
});
