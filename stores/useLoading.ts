import { useUiStore } from "~/stores/ui";

export function useStoreLoading(): { showLoading: () => void; hideLoading: () => void } {
  const ui = useUiStore();

  const showLoading = (): void => {
    ui.setLoading(true);
  };

  const hideLoading = (): void => {
    ui.setLoading(false);
  };

  return {
    showLoading,
    hideLoading,
  };
}
