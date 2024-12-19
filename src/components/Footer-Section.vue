<template>
  <div id="Footer">
    <div class="_container footer-content">
      <div class="footer-menu" v-for="n in 4">
        <h3>lorem2</h3>
        <a href="">Lorem ipsum dolor sit amet.</a>
        <a href="">Lorem ipsum dolor sit amet.</a>
        <a href="">Lorem ipsum dolor sit amet.</a>
        <a href="">Lorem ipsum dolor sit amet.</a>
        <a href="">Lorem ipsum dolor sit amet.</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
#Footer {
  background: var(--main-white);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  text-align: left;
}

._container {
  max-width: 90vw;
}

.footer-menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

a {
  text-transform: unset;
}
</style>
