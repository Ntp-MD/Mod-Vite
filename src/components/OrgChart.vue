<template>
  <div id="OrgChart">
    <div class="level-0 chart-box">
      <div class="level-items">
        <div class="level-items-content">Level 0</div>
      </div>
    </div>
    <div class="level-1 chart-box">
      <div class="level-items">
        <div class="level-items-content">Level 1</div>
      </div>
      <div class="level-items">
        <div class="level-items-content">Level 1</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#OrgChart {
  --h: 40px;
  --border: 2px;
  display: flex;
  flex-direction: column;
  place-items: center;
  gap: 80px;
}

.level-0.chart-box::before,
.level-0 .level-items-content::before {
  display: none;
}

.chart-box {
  position: relative;
  display: grid;
  place-items: center;
}

.level-1 {
  display: flex;
}

.level-items {
  position: relative;
}

.level-items::before {
  position: absolute;
  top: -100%;
  content: "";
  display: block;
  width: 100%;
  height: var(--border);
  background: #000;
}

.level-items:first-child::before {
  background: linear-gradient(to right, transparent 0%, transparent 50%, #000 50%, #000 100%);
}

.level-items:last-child::before {
  background: linear-gradient(to right, #000 0%, #000 50%, transparent 50%, transparent 100%);
}

.level-items-content {
  position: relative;
  display: grid;
  place-items: center;
  background: #fff;
  width: auto;
  min-width: 80px;
  padding: 10px 15px;
  margin: 0 20px;
}

.level-items-content::before {
  position: absolute;
  top: -100%;
  content: "";
  display: block;
  width: var(--border);
  height: var(--h);
  background: red;
}

.level-items-content::after {
  position: absolute;
  top: 100%;
  content: "";
  display: block;
  width: var(--border);
  height: var(--h);
  background: red;
}
</style>
