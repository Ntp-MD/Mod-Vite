import { useUiStore } from "@/stores/ui";

/**
 * Composable hook to control the global loading overlay.
 * Use this in any component that needs to show the global loader during async operations.
 *
 * Example:
 *   const { showLoading, hideLoading } = useLoading();
 *   onMounted(async () => {
 *     showLoading();
 *     try {
 *       const data = await fetchData();
 *       // process data...
 *     } finally {
 *       hideLoading();
 *     }
 *   });
 */
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
