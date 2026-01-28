import { ref, onMounted } from "vue";

export function useLoading(options = {}) {
  const { duration = 1000, waitForData = null } = options;
  const isLoading = ref(true);

  onMounted(async () => {
    // If waitForData is provided, wait for it to have content
    if (waitForData) {
      const checkData = () => {
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
