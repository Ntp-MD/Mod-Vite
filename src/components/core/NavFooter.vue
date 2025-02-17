<template>
  <div id="Footer">
    <div class="footer-content">
      <div class="footer-menu" v-for="n in 4" :key="n">
        <div>Lorem, ipsum dolor.</div>
        <p v-for="n in 4" :key="n">Lorem ipsum dolor sit amet.</p>
      </div>
    </div>
    <div class="footer-copyright">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, tenetur!</div>
  </div>
</template>

<style scoped>
#Footer {
  background: var(--color1);
}

#Footer * {
  color: #fff;
}

.footer-content {
  display: flex;
  justify-content: space-evenly;
  gap: 50px;
  width: 100%;
  height: 100%;
  text-align: left;
  padding: clamp(50px, 8vw, 70px) 0;
}

.footer-copyright {
  text-align: center;
  padding: 20px;
  border-top: 1px solid var(--font-color);
}

@media screen and (max-width: 992px) {
  .footer-content {
    display: none;
  }
}
</style>
