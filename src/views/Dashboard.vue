<template>
  <div id="Dashboard">
    <aside></aside>
    <div class="display-content">
      <div class="display-1"></div>
      <div class="display-2"></div>
      <div class="display-3"></div>
      <div class="display-4"></div>
    </div>
    <aside></aside>
  </div>
</template>

<style scoped>
.display-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  padding: 30px;
  background: #f9f9f9;
}

.display-content > div {
  width: auto;
  min-height: 25vw;
  border-radius: 12px;
  background: var(--main-bg);
  box-shadow: 0px 0px 8px #dddddd;
}

.display-3 {
  grid-column-start: span 2;
}
</style>
