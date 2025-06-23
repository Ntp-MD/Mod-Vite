<template>
  <div class="loading-screen">
    <div id="loading-content">Loading....</div>
  </div>
</template>

<style scoped>
.loading-screen {
  display: grid;
  place-content: center;
  place-items: center;
  width: 100%;
  height: 100%;
}

#loading-content {
  display: grid;
  position: relative;
  place-items: center;
  width: 20vw;
  height: 20vw;
}

#loading-content:before {
  content: "";
  position: absolute;
  border: 10px solid var(--btn);
  inset: 0;
}

#loading-content:before {
  border: 10px solid transparent;
  border-top-color: var(--btn);
  border-bottom-color: var(--ui-bg4);
  border-radius: 50%;
  animation: loader 3s linear infinite;
}

#loading-content:after {
  content: "";
  position: absolute;
  border: 10px solid var(--btn);
  inset: 25px;
}

#loading-content:after {
  border: 8px solid transparent;
  border-top-color: var(--ui-bg4);
  border-bottom-color: var(--btn);
  border-radius: 50%;
  animation: loader 1.5s linear infinite;
}

@keyframes loader {
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
