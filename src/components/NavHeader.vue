<template>
  <div id="nav-header">
    <div class="header-logo"><router-link to="/">Mod</router-link></div>
    <div :class="['header-menu', { open: isMenuOpen }]" ref="headerMenu">
      <router-link class="header-menu-link" to="/" @click="closeMenu">Frontend</router-link>
      <router-link class="header-menu-link" to="/About" @click="closeMenu">About</router-link>
      <router-link class="header-menu-link" to="/Font-Family" @click="closeMenu">Font Family</router-link>
      <router-link class="header-menu-link" to="/Slide" @click="closeMenu">Slide</router-link>
      <router-link class="header-menu-link" to="" @click="closeMenu">Embed</router-link>
      <router-link class="header-menu-link" to="" @click="closeMenu">Download</router-link>
    </div>
    <div id="nav-toggle" @click="toggleMenu" ref="navToggle">
      <div :class="{ animate: isMenuOpen }"></div>
      <div :class="{ animate: isMenuOpen }"></div>
      <div :class="{ animate: isMenuOpen }"></div>
    </div>
    <button>Dashboard</button>
  </div>
</template>

<script>
export default {
  data: () => ({ isMenuOpen: false }),
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  width: 100%;
  height: 70px;
  padding: 10px clamp(20px, 4vw, 50px);
  box-shadow: 0 0 3px #ccc;
}

.header-logo {
  min-width: 130px;
}

.header-menu {
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
  background: #fff;
}

@media screen and (max-width: 992px) {
  #nav-header button {
    display: none;
  }

  #nav-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 0 10px;
  }

  .header-logo {
    position: relative;
    width: 100%;
  }

  #nav-toggle {
    display: flex;
    gap: 5px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    cursor: pointer;
  }

  #nav-toggle div {
    background: var(--font-color2);
    width: 25px;
    height: 3px;
    transition: 0.5s;
    background-color: #333;
    transition: all 0.3s ease;
  }

  #nav-toggle div.animate:nth-child(2) {
    width: 16px;
  }

  .header-menu {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: absolute;
    top: 50px;
    left: -85%;
    height: 100vh;
    width: 80%;
    padding: 15px;
    background: #fff;
    transition: 0.8s ease;
  }

  .header-menu.open {
    left: 0;
  }
}
</style>
