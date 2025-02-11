<template>
  <div id="Footer">
    <div class="footer-content">
      <div class="footer-menu" v-for="n in 4" :key="n">
        <h3>Lorem, ipsum dolor.</h3>
        <p v-for="n in 4" :key="n">Lorem ipsum dolor sit amet.</p>
      </div>
    </div>
    <div class="footer-copyright">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, tenetur!
    </div>
  </div>
</template>

<style scoped>
.footer-content {
  background: var(--sub-color);
  color: var(--font-color);
  display: flex;
  justify-content: space-evenly;
  gap: 50px;
  width: 100%;
  height: 100%;
  text-align: left;
  padding: clamp(50px, 8vw, 70px) 0;

}

.footer-copyright {
  background: var(--sub-color);
  color: var(--font-color);
  text-align: center;
  padding: 15px;
  border-top: 1px solid var(--font-color);
}
</style>
