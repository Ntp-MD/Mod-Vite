<template>
  <div class="labelName">File Storage</div>
  <div class="DashboardGroup">
    <div class="Item">
      <div class="Title">BorderJustCorner</div>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste ad atque aliquam vitae facere et aut fugiat nemo quas eveniet.</p>
    </div>
    <div class="Item">
      <div class="Title">NumberRun</div>
    </div>
    <div class="Item"></div>
    <div class="Item"></div>
  </div>
</template>

<style scoped>
.DashboardGroup {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);
}

.Item {
  flex: 1 100%;
  display: grid;
  background: var(--sub-color);
  border-radius: var(--border-radius);
  height: 25vh;
  padding: var(--gap);
  border-bottom: 5px solid var(--btn-color);
}

.Title {
  font-size: 18px;
}

p {
  color: var(--font-color2);
}
</style>
