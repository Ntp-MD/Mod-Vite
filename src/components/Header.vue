<template>
  <div id="nav-header">
    <div class="nav-logo"><router-link to="/">Mod.IO</router-link></div>
    <nav :class="['nav-menu', { open: isMenuOpen }]" ref="NavMenu">
      <router-link class="nav-menu-link" to="/" @click="closeMenu">Home</router-link>
      <router-link class="nav-menu-link" to="/Font" @click="closeMenu">Font</router-link>
      <router-link class="nav-menu-link" to="/Slide" @click="closeMenu">Slide</router-link>
      <router-link class="nav-menu-link" to="/Planet" @click="closeMenu">Planet</router-link>
      <router-link class="nav-menu-link" to="/ITP" @click="closeMenu">ITP</router-link>
      <router-link class="nav-menu-link" to="/smo-login" @click="closeMenu">SMO</router-link>
    </nav>
    <div id="nav-toggle" @click="toggleMenu" ref="navToggle">
      <div :class="{ animate: isMenuOpen }"></div>
      <div :class="{ animate: isMenuOpen }"></div>
      <div :class="{ animate: isMenuOpen }"></div>
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
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
  mounted() {
    document.addEventListener("click", (e) => {
      if (!this.$refs.NavMenu.contains(e.target) && !this.$refs.navToggle.contains(e.target)) {
        this.isMenuOpen = false;
      }
    });
  },
};
</script>

<style scoped>
.nav-logo {
  text-align: left;
}

.nav-logo a {
  font-size: 30px;
  font-weight: 700;
  text-align: left;
}

#nav-header {
  display: grid;
  grid-template-columns: 20% auto 0;
  align-items: center;
  width: 100%;
  min-height: 100px;
  padding: 0 15vw;
  text-transform: uppercase;
  line-height: 1;
}

nav {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: clamp(15px, 5vw, 30px);
  width: 100%;
  height: 100%;
  background: transparent;
}

@media screen and (max-width: 1200px) {
  #nav-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 0 20px;
    background: var(--color);
  }

  #nav-header button {
    display: none;
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
    width: 25px;
    height: 3px;
    transition: 0.5s;
    background-color: #fff;
    transition: all 0.3s ease;
  }

  #nav-toggle div.animate:nth-child(2) {
    width: 16px;
  }

  nav {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: start;
    gap: 15px;
    position: absolute;
    top: 50px;
    left: -85%;
    height: 100vh;
    width: 80%;
    padding: 20px;
    margin: 0;
    background: var(--color);
    transition: 0.5s ease;
  }

  .nav-menu.open {
    left: 0;
  }
}
</style>
