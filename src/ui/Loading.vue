<template>
  <div class="loading-screen">
    <div id="loading-content">Loading...</div>
  </div>
</template>

<style scoped>
.loading-screen {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  width: 100%;
  height: 100%;
  user-select: none;
  background: var(--color2);
  border-radius: var(--border-radius);
}

#loading-content {
  display: grid;
  place-items: center;
  position: relative;
  width: 250px;
  height: 250px;
}

#loading-content::before {
  content: "";
  position: absolute;
  inset: 0;
  border: 8px solid transparent;
  border-top-color: var(--primary);
  border-bottom-color: var(--primary);
  border-radius: 50%;
  animation: loader 3s linear infinite;
}

#loading-content::after {
  content: "";
  position: absolute;
  inset: 25px;
  border: 5px solid transparent;
  border-top-color: #fff;
  border-bottom-color: var(--primary-hover);
  border-radius: 50%;
  animation: loader 1.5s linear infinite;
}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
