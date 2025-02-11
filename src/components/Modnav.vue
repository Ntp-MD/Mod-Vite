<template>
  <div id="nav-header">
    <div class="nav-logo"><router-link to="/">Mod</router-link></div>
    <div :class="['nav-menu', { open: isMenuOpen }]" ref="NavMenu">
      <router-link class="nav-menu-link" to="/" @click="closeMenu">Home</router-link>
      <router-link class="nav-menu-link" to="/Font" @click="closeMenu">Font</router-link>
      <router-link class="nav-menu-link" to="/Slide" @click="closeMenu">Slide</router-link>
      <router-link class="nav-menu-link" to="/Modquee" @click="closeMenu">Modquee</router-link>
      <router-link class="nav-menu-link" to="/smo-login" @click="closeMenu">SMO</router-link>
    </div>
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
#nav-header {
  display: grid;
  grid-template-columns: 20% auto 0;
  justify-items: center;
  align-items: center;
  background: #fff;
  width: 100%;
  height: 70px;
  padding: 10px clamp(20px, 10vw, 150px);
  box-shadow: 0 0 3px #ccc;
}

#nav-header {
  text-transform: uppercase;
}

.nav-logo {
  min-width: 130px;
}

.nav-menu {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: clamp(15px, 5vw, 30px);
  width: 100%;
  height: 100%;
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

  .nav-logo {
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

  .nav-menu {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: start;
    position: absolute;
    top: 50px;
    left: -85%;
    height: 100vh;
    width: 80%;
    padding: 15px;
    background: #fff;
    transition: 0.8s ease;
  }

  .nav-menu.open {
    left: 0;
  }
}
</style>
