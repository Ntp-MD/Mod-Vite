<template>
  <div class="timeline-container">
    <div class="grid">
      <div v-for="i in 52" :key="i" class="grid-item"></div>
    </div>
  </div>
</template>

<style>
.grid {
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  gap: 5px;
}

.grid-item {
  display: block;
  aspect-ratio: 1;
  border: 1px solid #555555;
}
</style>
