<template>
  <div id="Nav-header" class="_container">
    <div class="header-logo">Mod</div>
    <div class="header-menu">
      <router-link class="header-menu-link" to="/">Frontend</router-link>
      <router-link class="header-menu-link" to="/Font">Font Family</router-link>
      <router-link class="header-menu-link" to="/Embed">embed</router-link>
      <router-link class="header-menu-link" to="/ChatGPTComponent">Page</router-link>
      <router-link class="header-menu-link" to="/">Download</router-link>
    </div>
  </div>
</template>

<style scoped>
#Nav-header {
  display: grid;
  grid-template-columns: 20% auto;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 100%;
  max-width: 90vw;
  margin: 0 auto;
  padding: 0;
}

.header-menu {
  display: flex;
  gap: 20px;
}
</style>
