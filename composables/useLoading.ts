import { ref, onMounted, type Ref } from "vue";

interface UseLoadingOptions {
  duration?: number;
  waitForData?: Ref<unknown> | null;
}

export function useLoading(options: UseLoadingOptions | number = {}): { isLoading: Ref<boolean> } {
  const resolved = typeof options === "number" ? { duration: options } : options;
  const { duration = 1000, waitForData = null } = resolved;
  const isLoading = ref(true);

  onMounted(async () => {
    // If waitForData is provided, wait for it to have content
    if (waitForData) {
      const checkData = (): boolean => {
        if (Array.isArray(waitForData.value)) {
          return waitForData.value.length > 0;
        }
        return !!waitForData.value;
      };

      // Wait for data or timeout
      const maxWait = duration * 5;
      const startTime = Date.now();

      const interval = setInterval(() => {
        if (checkData() || Date.now() - startTime > maxWait) {
          clearInterval(interval);
          isLoading.value = false;
        }
      }, 50);
    } else {
      // Fallback to simple timeout
      setTimeout(() => {
        isLoading.value = false;
      }, duration);
    }
  });

  return {
    isLoading,
  };
}
