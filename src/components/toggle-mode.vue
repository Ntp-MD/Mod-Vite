<template>
  <div class="toggle-mode">
    <div class="bg-toggle">
      <div class="icon-toggle"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.toggle-mode {
  cursor: pointer;
  position: fixed;
  top: 40%;
  right: 10px;
}

.bg-toggle {
  position: relative;
  display: grid;
  place-items: center;
  width: 35px;
  aspect-ratio: 2/5;
  background-image: url(/src/assets/icon/bg-day.png);
  background-size: cover;
  background-repeat: no-repeat;
  border: 2px solid #ccc;
  border-radius: 30px;
}

.icon-toggle {
  background-image: url(/src/assets/icon/sun.png);
  background-size: cover;
  background-repeat: no-repeat;
  transform: translateY(-90%);
  height: 25px;
  aspect-ratio: 1;
  transition: 0.5s;
  border-radius: 50%;
}

body.dark-mode .bg-toggle {
  background-image: url(/src/assets/icon/bg-night.png) !important;
}

body.dark-mode .icon-toggle {
  background-image: url(/src/assets/icon/moon.png);
  transform: translateY(90%);
}
</style>
