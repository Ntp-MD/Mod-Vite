<template>
  <div class="loading-screen">
    <div id="loading-content">Loading....</div>
  </div>
</template>

<style scoped>
.loading-screen {
  display: grid;
  place-content: center;
  width: 100%;
  height: 100%;
  user-select: none;
}

#loading-content {
  display: grid;
  position: relative;
  place-items: center;
  width: 250px;
  height: 250px;
}

#loading-content:before {
  content: "";
  position: absolute;
  border: 6px solid red;
  inset: 0;
}

#loading-content:before {
  border: 8px solid transparent;
  border-top-color: var(--font-color);
  border-bottom-color: #ccc;
  border-radius: 50%;
  animation: loader 3s linear infinite;
}

#loading-content:after {
  content: "";
  position: absolute;
  border: 6px solid var(--font-color);
  inset: 25px;
}

#loading-content:after {
  border: 5px solid transparent;
  border-top-color: #fff;
  border-bottom-color: var(--font-color);
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
