<template>
  <div class="toggle-mode">
    <div class="icon-toggle"></div>
  </div>
</template>

<style scoped>
.toggle-mode {
  display: grid;
  aspect-ratio: 1;
  position: relative;
  cursor: pointer;
  padding: 10px;
}

.icon-toggle {
  background-image: url(@/assets/weather/sun.png);
  background-size: cover;
  background-repeat: no-repeat;
  height: 25px;
  aspect-ratio: 1;
  transition: 0.5s;
  border-radius: 50%;
}
</style>
