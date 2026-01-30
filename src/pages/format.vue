<template>
  <div class="half-circle">
    <div v-for="(item, i) in 9" :key="i" class="circle-item" :style="getPosition(i, 9, 150)">
      {{ i + 1 }}
    </div>
  </div>
</template>

<style scoped>
.half-circle {
  position: relative;
  aspect-ratio: 16/10;
  width: 100%;
  height: 30vw;
  border-radius: 30%;
  border: 1px solid #ccc;
}
.circle-item {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #3498db;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
}
</style>

<script setup>
function getPosition(index, total, radius) {
  // Angle from π (left) to 0 (right)
  const angle = Math.PI - (Math.PI * index) / (total - 1);
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  return {
    position: "absolute",
    left: `${x + radius}px`,
    top: `${y}px`,
  };
}
</script>
