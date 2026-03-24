export function useClipboard(): { copyToClipboard: (textToCopy: string) => Promise<boolean> } {
  function copyToClipboard(textToCopy: string): Promise<boolean> {
    return navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        return true;
      })
      .catch((err: unknown) => {
        console.error("Failed to copy text: ", err);
        return false;
      });
  }

  return {
    copyToClipboard,
  };
}
