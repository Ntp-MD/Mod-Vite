<template>
  <div class="footer-content">
    <div class="footer-menu" v-for="n in 4" :key="n">
      <h3>Lorem, ipsum dolor.</h3>
      <p v-for="n in 4" :key="n">Lorem ipsum dolor sit amet.</p>
    </div>
  </div>
</template>

<style scoped>
.footer-content {
  display: flex;
  place-content: center;
  place-items: center;
  justify-content: space-evenly;
  background: var(--main-overlay);
  gap: 50px;
  text-align: left;
  width: 100%;
  height: 20vw;
  min-height: 300px;
}
</style>
