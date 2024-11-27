<template>
  <div class="nav-header">
    <a href="/" class="nav-logo">MOD</a>
    <div class="nav-menu">
      <router-link class="nav-link" to="/page1">Page1</router-link>
      <router-link class="nav-link" to="/page2">Page2</router-link>
      <router-link class="nav-link" to="/page3">Page3</router-link>
      <router-link class="nav-link" to="/page4">Page4</router-link>
    </div>
  </div>
  <div class="toggle-mode">
    <div class="bg-toggle">
      <div class="icon-toggle"></div>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.nav-header {
  display: grid;
  grid-template-columns: 20% 80%;
  align-items: center;
  width: 80vw;
  height: 5vw;
  margin: 0 auto;
}

.nav-logo {
  font-size: 3vw;
  font-weight: 700;
  color: var(--color3);
}

.nav-menu {
  display: flex;
  justify-content: flex-end;
  gap: 1vw;
}
</style>
