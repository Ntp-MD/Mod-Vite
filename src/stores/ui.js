import { defineStore } from "pinia";

export const useUiStore = defineStore("ui", {
  state: () => ({
    isLoading: false,
  }),
  getters: {
    loading: (state) => state.isLoading,
  },
  actions: {
    setLoading(val) {
      this.isLoading = Boolean(val);
    },
  },
});
