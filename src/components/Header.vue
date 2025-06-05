<template>
  <div id="navHeader" :class="['nav-menu', { 'nav-menu--open': isMenuOpen }]" ref="NavMenu">
    <router-link class="nav-menu-link" to="/Dashboard" @click="closeMenu">Dashboard</router-link>
    <div id="navToggle" @click="toggleMenu" ref="navToggle">
      <div :class="{ 'is-active': isMenuOpen }"></div>
      <div :class="{ 'is-active': isMenuOpen }"></div>
      <div :class="{ 'is-active': isMenuOpen }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
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
#navHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
  min-height: 50px;
  padding: 0 15px;
}

#navHeader a {
  color: var(--ui-font);
}

#navLogo {
  flex: 1;
}

#navLogo a {
  font-size: 20px;
  font-weight: 700;
  text-align: left;
}

#navToggle {
  display: none;
}
</style>
