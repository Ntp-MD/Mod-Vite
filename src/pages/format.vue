<template>
  <div class="grid-foundation">
    <div class="grid-container">
      <!-- Grid cells with area names -->
      <div
        v-for="cell in gridCells"
        :key="cell.key"
        class="grid-cell"
        :style="`grid-area: ${cell.row} / ${cell.col} / ${cell.row + 1} / ${cell.col + 1}`"
        :data-area="`area-${cell.row}-${cell.col}`"
      >
        {{ cell.row }}-{{ cell.col }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    gridCells() {
      const cells = [];
      for (let row = 1; row <= 30; row++) {
        for (let col = 1; col <= 60; col++) {
          cells.push({
            key: `${row}-${col}`,
            row,
            col,
          });
        }
      }
      return cells;
    },
  },
};
</script>

<style>
.grid-foundation {
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(60, 1fr);
  grid-template-rows: repeat(30, 1fr);
  gap: 1px;
  border: 1px solid #969696;
  width: 100%;
  height: 100%;
}

.grid-cell {
  aspect-ratio: 1;
  border: 0.5px solid #969696;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0;
  cursor: pointer;
}

.grid-cell:hover {
  background-color: #f0f0f0;
}

.grid-cell[data-area]::after {
  content: attr(data-area);
  position: absolute;
  font-size: 8px;
  color: #666;
  opacity: 0;
  transition: opacity 0.2s;
}

.grid-cell:hover[data-area]::after {
  opacity: 1;
}
</style>
