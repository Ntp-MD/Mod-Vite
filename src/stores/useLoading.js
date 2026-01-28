import { useUiStore } from "@/stores/ui";

export function useLoading() {
  const ui = useUiStore();

  const showLoading = () => {
    ui.setLoading(true);
  };

  const hideLoading = () => {
    ui.setLoading(false);
  };

  return {
    showLoading,
    hideLoading,
  };
}
