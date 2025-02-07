<template></template>

<style>
.modquee-contanier {
  display: flex;
  align-items: center;
  height: 280px;
  width: 100vw;
  margin: 0 auto;
  position: relative;
  left: -50vw;
}

.modquee-box {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  animation: linear-scroll 40s linear infinite;
  transform: translateX(100%);
  z-index: 1;
}

.cloned {
  animation-delay: 20s;
  z-index: 0;
}

.modquee-item {
  padding: 15px;
}

.modquee-box img {
  height: 250px !important;
  width: 250px !important;
  border-radius: 25px;
  box-shadow: 0 4px 18px rgb(0, 0, 0, 0.1);
}

@keyframes linear-scroll {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(-100%);
  }
}
</style>

<script>
const observer = new MutationObserver((mutationsList, observer) => {
  const modqueeContainer = document.querySelector(".modquee-contanier");
  const modqueeBox = document.querySelector(".modquee-box");

  if (modqueeContainer && modqueeBox) {
    const cloneCount = 1;

    for (let i = 0; i < cloneCount; i++) {
      const clonedContent = modqueeBox.cloneNode(true);
      clonedContent.classList.add("cloned");
      modqueeContainer.appendChild(clonedContent);
    }

    // Stop observing once the desired elements are found and cloned
    observer.disconnect();
  }
});

// Start observing the entire document for changes
observer.observe(document.body, { childList: true, subtree: true });
</script>
