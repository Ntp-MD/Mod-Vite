<template>
  <div class="body">
    <div class="item1"></div>
    <div class="item2"></div>
    <div class="item3"></div>
    <div class="item4"></div>
    <div class="item5"></div>
    <div class="item6"></div>
    <div class="item7"></div>
  </div>
</template>

<style scoped>
.body {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.body div {
  display: block;
  background: var(--ui-bg1);
  width: auto;
  height: auto;
  min-width: 100px;
  min-height: 100px;
}

.item1 {
  flex: 2;
  aspect-ratio: 5/10;
}

.item2 {
  flex: 1;
  aspect-ratio: 16/10;
}

.item2 {
  flex: 0.5;
}
</style>
