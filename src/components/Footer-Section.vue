<template>
  <div id="footer">
    <div class="_container">
      <div class="footer-content">
        <div class="footer-menu" v-for="n in 4" :key="n">
          <h3>lorem2</h3>
          <a href="">Lorem ipsum dolor sit amet.</a>
          <a href="">Lorem ipsum dolor sit amet.</a>
          <a href="">Lorem ipsum dolor sit amet.</a>
          <a href="">Lorem ipsum dolor sit amet.</a>
          <a href="">Lorem ipsum dolor sit amet.</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#footer {
  background: var(--main-overlay);
  height: 25vw;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: left;
}

.footer-menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-content a {
  text-transform: unset;
}
</style>
