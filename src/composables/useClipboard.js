export function useClipboard() {
  function copyToClipboard(textToCopy) {
    return navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        return false;
      });
  }

  return {
    copyToClipboard,
  };
}
