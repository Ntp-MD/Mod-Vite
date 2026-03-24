import { defineStore } from "pinia";

export const useUiStore = defineStore("ui", {
  state: () => ({
    isLoading: false as boolean,
  }),
  getters: {
    loading: (state): boolean => state.isLoading,
  },
  actions: {
    setLoading(val: unknown): void {
      this.isLoading = Boolean(val);
    },
  },
});
