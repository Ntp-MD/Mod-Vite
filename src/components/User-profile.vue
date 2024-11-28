<template>
  <div class="user-box">
    <img src="@/assets/weather/day-and-night.png" alt="" />
    <div>admin</div>
  </div>
</template>

<style scoped>
.user-box {
  display: grid;
  grid-template-columns: 30px auto;
  align-items: center;
  gap: 10px;
  text-transform: uppercase;
}

img {
  aspect-ratio: 1;
  border-radius: 50%;
}
</style>
