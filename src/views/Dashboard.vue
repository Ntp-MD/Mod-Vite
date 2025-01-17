<template>
  <div id="Dashboard">
    <aside></aside>
    <div class="display-panel">
      <div class="display-1">
        <div class="display-head">
          <div>Overview</div>
          <div>All Time</div>
        </div>
        <div class="display-content"></div>
      </div>
      <div class="display-2"></div>
      <div class="display-3"></div>
      <div class="display-4"></div>
    </div>
    <aside></aside>
  </div>
</template>

<style scoped>
* {
  --gap: 50px;
}

.display-panel {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--gap);
  padding: var(--gap);
  background: #f9f9f9;
}

.display-panel > div {
  width: auto;
  min-height: 25vw;
  border-radius: 12px;
  background: var(--main-bg);
  box-shadow: 0px 0px 8px #dddddd;
}

.display-head {
  display: flex;
  justify-content: space-between;
  padding: 25px 30px;
  color: var(--gap);
}

.display-3 {
  grid-column-start: span 2;
}
</style>
