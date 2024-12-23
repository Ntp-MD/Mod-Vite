<template>
  <div id="Nav-header">
    <div class="Header-logo">Mod</div>
    <div id="Nav-toggle" @click="toggleMenu">
      <div :class="{ animate: isMenuOpen }"></div>
      <div :class="{ animate: isMenuOpen }"></div>
      <div :class="{ animate: isMenuOpen }"></div>
    </div>
    <div :class="['Header-menu', { open: isMenuOpen }]">
      <router-link class="Header-menu-link" to="/">Frontend</router-link>
      <router-link class="Header-menu-link" to="/Font">Font Family</router-link>
      <router-link class="Header-menu-link" to="/Landing">Landing</router-link>
      <router-link class="Header-menu-link" to="/">Embed</router-link>
      <router-link class="Header-menu-link" to="/">Download</router-link>
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
#Nav-header {
  position: sticky;
  top: 0;
  z-index: 1;
  background: var(--main-white);

  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100vw;
  height: 50px;
  box-shadow: 0 0 3px #ccc;
}

.Header-menu {
  display: flex;
  gap: 20px;
}

@media screen and (max-width: 992px) {
  #Nav-header {
    display: flex;
    justify-content: space-between;
  }

  .Header-logo {
    position: relative;
    padding-left: 10px;
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
    width: 45px;
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

  .Header-menu {
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

  .Header-menu.open {
    left: 0;
  }
}
</style>
