<template>
  <div id="nav-header">
    <div class="header-logo"><router-link to="/">Mod</router-link></div>
    <div id="Nav-toggle" @click="toggleMenu">
      <div :class="{ animate: isMenuOpen }"></div>
      <div :class="{ animate: isMenuOpen }"></div>
      <div :class="{ animate: isMenuOpen }"></div>
    </div>
    <div :class="['header-menu', { open: isMenuOpen }]">
      <router-link class="header-menu-link" to="/">Frontend</router-link>
      <router-link class="header-menu-link" to="/Font-Family">Font Family</router-link>
      <router-link class="header-menu-link" to="/Slide">Slide</router-link>
      <router-link class="header-menu-link" to="">Embed</router-link>
      <router-link class="header-menu-link" to="">Download</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({ isMenuOpen: false }),
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
  mounted() {
    document.addEventListener("click", (e) => {
      if (!this.$refs.headerMenu.contains(e.target) && !this.$refs.navToggle.contains(e.target)) {
        this.isMenuOpen = false;
      }
    });
  },
};
</script>

<style scoped>
#nav-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--main-white);

  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100vw;
  height: 50px;
  box-shadow: 0 0 3px #ccc;
}

.header-menu {
  display: flex;
  gap: 20px;
}

@media screen and (max-width: 992px) {
  #nav-header {
    display: flex;
    justify-content: space-between;
  }

  .header-logo {
    position: relative;
    padding-left: 15px;
    width: 100%;
  }

  #Nav-toggle {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    height: 50px;
    width: 50px;
  }

  #Nav-toggle div {
    background: var(--font-color2);
    width: 25px;
    height: 3px;
    transition: 0.5s;
  }

  #Nav-toggle div.animate:nth-child(2) {
    width: 16px;
  }

  .header-menu {
    position: absolute;
    top: 50px;
    left: -85%;

    display: flex;
    flex-direction: column;

    height: 100vh;
    width: 70%;
    padding: 15px;
    background: var(--main-white);
    transition: 0.8s;
  }

  .header-menu.open {
    left: 0;
  }
}
</style>
