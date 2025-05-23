<template>
  <div class="QuicksAside">
    <img src="/src/assets/icon/search.png" alt="" />
    <img src="/src/assets/icon/graph.png" alt="" />
    <img src="/src/assets/icon/link.png" alt="" />
    <img src="/src/assets/icon/swap.png" alt="" />
    <img src="/src/assets/icon/copy.png" alt="" />
  </div>
</template>

<style scoped>
.QuicksAside {
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: var(--ui-bg1);
  padding: 75px 12px 0;
}

.QuicksAside img {
  object-fit: contain;
  height: auto;
  filter: invert(1);
}
</style>
