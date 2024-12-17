<template>
  <div id="Nav-header">
    <div class="header-logo">Mod</div>
    <div class="header-menu">
      <router-link class="header-menu-link" to="/">Test space</router-link>
      <router-link class="header-menu-link" to="/Font">Font Family</router-link>
      <router-link class="header-menu-link" to="/Embed">embed</router-link>
      <router-link class="header-menu-link" to="/ChatGPTComponent">Page</router-link>
      <router-link class="header-menu-link" to="/">Download</router-link>
    </div>
  </div>
</template>

<style scoped>
#Nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  height: 50px;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
}

.header-menu {
  display: flex;
  gap: 20px;
}
</style>
